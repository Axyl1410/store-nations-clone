import bcrypt from "bcrypt";
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
    if (!user || !(await bcrypt.compare(password, user.Password))) return null;

    return user;
  } catch (error) {
    console.error("Error logging in with email and password:", error);
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
