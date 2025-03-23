/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from "mysql2/promise";
import { connection } from "../lib/mysql";

/**
 * Get cart by ID with all items and product details
 */
export async function getCartById(cartId: number) {
  try {
    // Get cart
    const [cart] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Cart WHERE CartID = ?",
      [cartId],
    );

    if (!cart || cart.length === 0) {
      return null;
    }

    // Get cart items with product details
    const [items] = await connection.execute<mysql.RowDataPacket[]>(
      `
      SELECT ci.*, p.ProductName, p.Category, p.ImageURL
      FROM CartItems ci
      JOIN Products p ON ci.ProductID = p.ProductID
      WHERE ci.CartID = ?
      `,
      [cartId],
    );

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items as any[]) {
      totalAmount += item.Price * item.Quantity;
    }

    return {
      ...cart[0],
      items: items,
      totalAmount,
    };
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
}

/**
 * Get active cart for a customer, or create one if none exists
 */
export async function getOrCreateCart(customerId: number) {
  try {
    // Check if customer has an active cart
    const [carts] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Cart WHERE CustomerID = ? ORDER BY CreatedAt DESC LIMIT 1",
      [customerId],
    );

    let cartId: number;

    // If no cart exists, create one
    if (!carts || carts.length === 0) {
      const [result] = await connection.execute<mysql.RowDataPacket[]>(
        "INSERT INTO Cart (CustomerID) VALUES (?)",
        [customerId],
      );
      cartId = (result as any).insertId;
    } else {
      cartId = carts[0].CartID;
    }

    // Get cart with items
    return await getCartById(cartId);
  } catch (error) {
    console.error("Error getting or creating cart:", error);
    throw error;
  }
}

/**
 * Get all carts for a customer
 */
export async function getCartsByCustomerId(customerId: number) {
  try {
    // Get all carts belonging to the customer
    const [carts] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Cart WHERE CustomerID = ? ORDER BY CreatedAt DESC",
      [customerId],
    );

    return carts;
  } catch (error) {
    console.error("Error getting customer carts:", error);
    throw error;
  }
}

/**
 * Add item to cart
 */
export async function addToCart(
  cartId: number,
  productId: number,
  quantity: number,
) {
  try {
    // Get product price and stock quantity
    const [product] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Products WHERE ProductID = ?",
      [productId],
    );

    if (!product || product.length === 0) {
      console.log("Product not found");
      throw new Error("Product not found");
    }

    const productPrice = product[0].Price;
    const availableStock = product[0].StockQuantity;

    // Check if product already exists in cart
    const [existing] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM CartItems WHERE CartID = ? AND ProductID = ?",
      [cartId, productId],
    );

    if (existing && existing.length > 0) {
      // Calculate new total quantity
      const newQuantity = existing[0].Quantity + quantity;

      // Check if we have enough stock
      if (newQuantity > availableStock) {
        throw new Error(`Only ${availableStock} items available in stock`);
      }

      await connection.execute(
        "UPDATE CartItems SET Quantity = ? WHERE CartItemID = ?",
        [newQuantity, existing[0].CartItemID],
      );

      return {
        ...existing[0],
        Quantity: newQuantity,
      };
    } else {
      // Check if we have enough stock for new cart item
      if (quantity > availableStock) {
        throw new Error(`Only ${availableStock} items available in stock`);
      }

      // Add new cart item
      const [result] = await connection.execute<mysql.RowDataPacket[]>(
        "INSERT INTO CartItems (CartID, ProductID, Quantity, Price) VALUES (?, ?, ?, ?)",
        [cartId, productId, quantity, productPrice],
      );

      const cartItemId = (result as any).insertId;

      // Get the newly added item with product details
      const [newItem] = await connection.execute<mysql.RowDataPacket[]>(
        `
        SELECT ci.*, p.ProductName, p.Category, p.ImageURL
        FROM CartItems ci
        JOIN Products p ON ci.ProductID = p.ProductID
        WHERE ci.CartItemID = ?
        `,
        [cartItemId],
      );

      return newItem[0];
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(cartItemId: number, quantity: number) {
  try {
    // Check if item exists
    const [item] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT ci.*, p.StockQuantity FROM CartItems ci JOIN Products p ON ci.ProductID = p.ProductID WHERE ci.CartItemID = ?",
      [cartItemId],
    );

    if (!item || item.length === 0) {
      throw new Error("Cart item not found");
    }

    if (quantity <= 0) {
      // If quantity is zero or negative, remove the item
      await connection.execute("DELETE FROM CartItems WHERE CartItemID = ?", [
        cartItemId,
      ]);
      return { deleted: true, cartItemId };
    }

    // Check if requested quantity exceeds available stock
    if (quantity > item[0].StockQuantity) {
      throw new Error(`Only ${item[0].StockQuantity} items available in stock`);
    }

    // Update the quantity
    await connection.execute(
      "UPDATE CartItems SET Quantity = ? WHERE CartItemID = ?",
      [quantity, cartItemId],
    );

    // Get updated item with product details
    const [updatedItem] = await connection.execute<mysql.RowDataPacket[]>(
      `
      SELECT ci.*, p.ProductName, p.Category, p.ImageURL
      FROM CartItems ci
      JOIN Products p ON ci.ProductID = p.ProductID
      WHERE ci.CartItemID = ?
      `,
      [cartItemId],
    );

    return updatedItem[0];
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(cartItemId: number) {
  try {
    // Check if item exists
    const [item] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM CartItems WHERE CartItemID = ?",
      [cartItemId],
    );

    if (!item || item.length === 0) {
      throw new Error("Cart item not found");
    }

    // Delete the item
    await connection.execute("DELETE FROM CartItems WHERE CartItemID = ?", [
      cartItemId,
    ]);

    return { deleted: true, cartItemId };
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
}

/**
 * Clear all items from cart
 */
export async function clearCart(cartId: number) {
  try {
    // Delete all items from cart
    const [result] = await connection.execute<mysql.RowDataPacket[]>(
      "DELETE FROM CartItems WHERE CartID = ?",
      [cartId],
    );

    return {
      deleted: true,
      cartId,
      itemsRemoved: (result as any).affectedRows,
    };
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
}

/**
 * Delete a cart completely
 */
export async function deleteCart(cartId: number) {
  try {
    // First, clear all items from the cart
    await clearCart(cartId);

    // Then delete the cart itself
    const [result] = await connection.execute<mysql.RowDataPacket[]>(
      "DELETE FROM Cart WHERE CartID = ?",
      [cartId],
    );

    return {
      data: (result as any).affectedRows,
      deleted: true,
      cartId,
    };
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
}
