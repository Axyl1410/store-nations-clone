// Get the client
import mysql from "mysql2/promise";

// Create the connection to database
const connection = await mysql.createConnection({
  host: process.env.SQL_HOST || "localhost",
  database: process.env.SQL_DATABASE || "csdl",
  user: process.env.SQL_USER || "root",
  password: process.env.SQL_PASSWORD || "root",
});

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
    // Query to find user with matching email and password
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Customers WHERE Email = ? and Password = ? LIMIT 1",
      [email, password],
    );
    return rows[0] as { id: number; Email: string; Password: string };
  } catch (error) {
    console.error("Error logging in with email and password:", error);
    throw error;
  }
}

//Todo make function for signup
