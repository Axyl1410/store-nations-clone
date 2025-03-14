import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

// Create the connection to database
const connection = await mysql.createConnection({
  host: process.env.SQL_HOST || "localhost",
  database: process.env.SQL_DATABASE || "csdl",
  user: process.env.SQL_USER || "root",
  password: process.env.SQL_PASSWORD || "root",
  port: parseInt(process.env.SQL_PORT || "3306"),
  uri: process.env.SQL_URI || "mysql://root:root@localhost:3306/csdl",
});

//#region 1. Customers

// Function to get all customers
export async function getAllCustomers() {
  try {
    const [rows] = await connection.execute("SELECT * FROM Customers");
    return rows;
  } catch (error) {
    console.error("Error fetching all customers:", error);
    throw error;
  }
}

// Function to login with email and password
export async function loginWithEmailAndPassword(
  email: string,
  password: string,
) {
  try {
    // First find user with the email only
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Customers WHERE Email = ? LIMIT 1",
      [email],
    );

    const user = rows[0] || null;

    // If no user found or password doesn't match
    if (!user || !bcrypt.compare(password, user.Password)) return null;

    return user;
  } catch (error) {
    throw error;
  }
}

export async function createCustomer(
  fullname: string,
  email: string,
  password: string,
  phone: string,
  address: string,
) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createdAt = new Date();

    const [rows] = await connection.execute(
      "INSERT INTO Customers (FullName, Email, Password, PhoneNumber, Address, CreateAt) VALUES (?, ?, ?, ?, ?, ?)",
      [fullname, email, hashedPassword, phone, address, createdAt],
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function updateCustomer(
  id: number,
  fullname: string,
  email: string,
  phone: string,
  address: string,
) {
  try {
    const [rows] = await connection.execute(
      "UPDATE Customers SET FullName = ?, Email = ?, PhoneNumber = ?, Address = ? WHERE ID = ?",
      [fullname, email, phone, address, id],
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function deleteCustomer(id: number) {
  try {
    const [rows] = await connection.execute(
      "DELETE FROM Customers WHERE ID = ?",
      [id],
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function getCustomerById(id: number) {
  try {
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Customers WHERE ID = ?",
      [id],
    );
    return rows[0] || null;
  } catch (error) {
    throw error;
  }
}

//#endregion
//#region 2. Orders

export async function getAllOrders() {
  try {
    const [rows] = await connection.execute("SELECT * FROM Orders");
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function createOrder(
  customerId: number,
  total: number,
  status: string,
) {
  try {
    const createdAt = new Date();

    const [rows] = await connection.execute(
      "INSERT INTO Orders (CustomerID, Total, Status, CreateAt) VALUES (?, ?, ?, ?)",
      [customerId, total, status, createdAt],
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

//#endregion
//#region 3. Products

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

//#endregion
