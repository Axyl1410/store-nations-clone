import mysql from "mysql2/promise";
import { connection } from "../lib/mysql";

export async function getAllProducts() {
  await connection.beginTransaction();

  try {
    // Modified query to join with Customers table
    const [rows] = await connection.execute(`
      SELECT p.*, c.FullName
      FROM Products p
      LEFT JOIN Customers c ON p.CustomerID = c.CustomerID
    `);

    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}

export async function getProductsWithPagination(limit = 10, offset = 0) {
  await connection.beginTransaction();

  try {
    // Paginated query with customer join
    const [rows] = await connection.execute(
      `
      SELECT p.*, c.FullName
      FROM Products p
      LEFT JOIN Customers c ON p.CustomerID = c.CustomerID
      LIMIT ? OFFSET ?
    `,
      [limit, offset],
    );

    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}

export async function createProduct(
  productName: string,
  category: string,

  price: number,
  stockQuantity: number,
  imageUrl?: string,
  description?: string,
  customerId?: number,
) {
  await connection.beginTransaction();

  try {
    // Updated to include CustomerID
    const [row] = await connection.execute(
      "INSERT INTO Products (ProductName, Category, Price, StockQuantity, ImageURL, Description, CustomerID) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        productName,
        category,
        price,
        stockQuantity,
        imageUrl || null,
        description || null,
        customerId || null,
      ],
    );

    await connection.commit();
    return row;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}

export async function getProductById(id: number) {
  await connection.beginTransaction();

  try {
    // Modified to include customer data
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      `
      SELECT p.*, c.FullName
      FROM Products p
      LEFT JOIN Customers c ON p.CustomerID = c.CustomerID
      WHERE p.ProductID = ?
    `,
      [id],
    );

    await connection.commit();
    return rows[0] || null;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}

export async function updateProduct(
  id: number,
  productName: string,
  category: string,
  price: number,
  stockQuantity: number,
  imageUrl?: string,
  description?: string,
  customerId?: number,
) {
  await connection.beginTransaction();

  try {
    // Updated to include CustomerID
    const [row] = await connection.execute(
      "UPDATE Products SET ProductName = ?, Category = ?, Price = ?, StockQuantity = ?, ImageURL = ?, Description = ?, CustomerID = ? WHERE ProductID = ?",
      [
        productName,
        category,
        price,
        stockQuantity,
        imageUrl || null,
        description || null,
        customerId || null,
        id,
      ],
    );

    await connection.commit();
    return row;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}

// New function to get products by customer ID
export async function getProductsByCustomerId(customerId: number) {
  await connection.beginTransaction();

  try {
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Products WHERE CustomerID = ?",
      [customerId],
    );

    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}

export async function getRandomProducts(count: number | string) {
  if (typeof count === "number") count = count.toString();
  await connection.beginTransaction();

  try {
    // Get 5 unique random products with customer info
    const [rows] = await connection.execute(
      `
      SELECT p.*, c.FullName
      FROM Products p
      LEFT JOIN Customers c ON p.CustomerID = c.CustomerID
      ORDER BY RAND()
      LIMIT ?
    `,
      [count],
    );

    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}
