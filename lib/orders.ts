/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from "mysql2/promise";
import { connection } from "./mysql";

/**
 * Get all orders with optional filtering by customer ID
 */
export async function getAllOrders(customerId?: number) {
  try {
    let query = `
      SELECT o.*, c.FullName, c.Email, c.PhoneNumber
      FROM Orders o
      LEFT JOIN Customers c ON o.CustomerID = c.CustomerID
    `;

    const params = [];

    if (customerId) {
      query += " WHERE o.CustomerID = ?";
      params.push(customerId);
    }

    query += " ORDER BY o.OrderDate DESC";

    const [orders] = await connection.execute<mysql.RowDataPacket[]>(
      query,
      params,
    );
    return orders;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
}

/**
 * Get order by ID with details
 */
export async function getOrderById(orderId: number) {
  try {
    // Get order
    const [orders] = await connection.execute<mysql.RowDataPacket[]>(
      `SELECT o.*, c.FullName, c.Email, c.PhoneNumber, c.Address
       FROM Orders o
       LEFT JOIN Customers c ON o.CustomerID = c.CustomerID
       WHERE o.OrderID = ?`,
      [orderId],
    );

    if (!orders || orders.length === 0) {
      return null;
    }

    // Get order details with product information
    const [details] = await connection.execute<mysql.RowDataPacket[]>(
      `SELECT od.*, p.ProductName, p.Category, p.ImageURL
       FROM OrderDetails od
       JOIN Products p ON od.ProductID = p.ProductID
       WHERE od.OrderID = ?`,
      [orderId],
    );

    return {
      ...orders[0],
      details,
    };
  } catch (error) {
    console.error("Error getting order:", error);
    throw error;
  }
}

/**
 * Create new order from cart
 */
export async function createOrderFromCart(
  customerId: number,
  cartId: number,
  status: string = "Pending",
) {
  try {
    // Start a transaction
    await connection.beginTransaction();

    try {
      // Get cart items
      const [cartItems] = await connection.execute<mysql.RowDataPacket[]>(
        `SELECT ci.*, p.ProductName
         FROM CartItems ci
         JOIN Products p ON ci.ProductID = p.ProductID
         WHERE ci.CartID = ?`,
        [cartId],
      );

      if (!cartItems || cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      // Calculate total amount
      let totalAmount = 0;
      for (const item of cartItems as any[]) {
        totalAmount += item.Price * item.Quantity;
      }

      // Create order
      const [orderResult] = await connection.execute<mysql.RowDataPacket[]>(
        "INSERT INTO Orders (CustomerID, TotalAmount, Status) VALUES (?, ?, ?)",
        [customerId, totalAmount, status],
      );

      const orderId = (orderResult as any).insertId;

      // Create order details for each cart item
      for (const item of cartItems as any[]) {
        await connection.execute(
          "INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price) VALUES (?, ?, ?, ?)",
          [orderId, item.ProductID, item.Quantity, item.Price],
        );

        // Update product stock quantity
        await connection.execute(
          "UPDATE Products SET StockQuantity = StockQuantity - ? WHERE ProductID = ?",
          [item.Quantity, item.ProductID],
        );
      }

      // Clear the cart
      await connection.execute("DELETE FROM CartItems WHERE CartID = ?", [
        cartId,
      ]);

      // Commit the transaction
      await connection.commit();

      // Return the created order with details
      return getOrderById(orderId);
    } catch (error) {
      // Rollback the transaction on error
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error creating order from cart:", error);
    throw error;
  }
}

/**
 * Create order directly from provided items
 */
export async function createOrder(
  customerId: number,
  items: Array<{ productId: number; quantity: number }>,
  status: string = "Pending",
) {
  try {
    // Start a transaction
    await connection.beginTransaction();

    try {
      // Validate all products exist and have enough stock
      let totalAmount = 0;
      const orderItems = [];

      for (const item of items) {
        // Get product details
        const [products] = await connection.execute<mysql.RowDataPacket[]>(
          "SELECT * FROM Products WHERE ProductID = ?",
          [item.productId],
        );

        if (!products || products.length === 0) {
          throw new Error(`Product ${item.productId} not found`);
        }

        const product = products[0];

        // Check stock
        if (product.StockQuantity < item.quantity) {
          throw new Error(
            `Not enough stock for product ${product.ProductName}`,
          );
        }

        // Add to total
        const itemTotal = product.Price * item.quantity;
        totalAmount += itemTotal;

        // Store for later insertion
        orderItems.push({
          ...item,
          price: product.Price,
        });
      }

      // Create order
      const [orderResult] = await connection.execute<mysql.RowDataPacket[]>(
        "INSERT INTO Orders (CustomerID, TotalAmount, Status) VALUES (?, ?, ?)",
        [customerId, totalAmount, status],
      );

      const orderId = (orderResult as any).insertId;

      // Create order details for each item
      for (const item of orderItems) {
        await connection.execute(
          "INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price) VALUES (?, ?, ?, ?)",
          [orderId, item.productId, item.quantity, item.price],
        );

        // Update product stock quantity
        await connection.execute(
          "UPDATE Products SET StockQuantity = StockQuantity - ? WHERE ProductID = ?",
          [item.quantity, item.productId],
        );
      }

      // Commit the transaction
      await connection.commit();

      // Return the created order with details
      return getOrderById(orderId);
    } catch (error) {
      // Rollback the transaction on error
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId: number, status: string) {
  try {
    // Update order status
    await connection.execute("UPDATE Orders SET Status = ? WHERE OrderID = ?", [
      status,
      orderId,
    ]);

    // Get updated order
    return getOrderById(orderId);
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

/**
 * Cancel order and restore stock
 */
export async function cancelOrder(orderId: number) {
  try {
    // Start a transaction
    await connection.beginTransaction();

    try {
      // Get order details to restore stock
      const [details] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM OrderDetails WHERE OrderID = ?",
        [orderId],
      );

      // Restore stock for each product
      for (const item of details as any[]) {
        await connection.execute(
          "UPDATE Products SET StockQuantity = StockQuantity + ? WHERE ProductID = ?",
          [item.Quantity, item.ProductID],
        );
      }

      // Update order status to cancelled
      await connection.execute(
        "UPDATE Orders SET Status = ? WHERE OrderID = ?",
        ["Cancelled", orderId],
      );

      // Commit the transaction
      await connection.commit();

      // Return the updated order
      return getOrderById(orderId);
    } catch (error) {
      // Rollback the transaction on error
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
}
