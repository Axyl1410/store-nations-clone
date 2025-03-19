import mysql from "mysql2/promise";
import { connection } from "./mysql";

export async function getAllProducts() {
  try {
    // Modified query to join with Customers table
    const [rows] = await connection.execute(`
      SELECT p.*, c.FullName
      FROM Products p
      LEFT JOIN Customers c ON p.CustomerID = c.CustomerID
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function getProductsWithPagination(limit = 10, offset = 0) {
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
    return rows;
  } catch (error) {
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
    return row;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id: number) {
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
    return rows[0] || null;
  } catch (error) {
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
    return row;
  } catch (error) {
    throw error;
  }
}

// New function to get products by customer ID
export async function getProductsByCustomerId(customerId: number) {
  try {
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Products WHERE CustomerID = ?",
      [customerId],
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function getRandomProducts(count = 5) {
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
    return rows;
  } catch (error) {
    throw error;
  }
}
