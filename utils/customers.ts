import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import { connection } from "../lib/mysql";

export async function loginWithEmailAndPassword(
  email: string,
  password: string,
) {
  await connection.beginTransaction();

  try {
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Customers WHERE Email = ? LIMIT 1",
      [email],
    );

    const user = rows[0] || null;
    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (!passwordMatch || !user) throw new Error("Invalid email or password");

    await connection.commit();
    return user;
  } catch (error) {
    await connection.rollback();
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
  await connection.beginTransaction();

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createdAt = new Date();

    const [rows] = await connection.execute(
      "INSERT INTO Customers (FullName, Email, Password, PhoneNumber, Address, CreateAt) VALUES (?, ?, ?, ?, ?, ?)",
      [fullname, email, hashedPassword, phone, address, createdAt],
    );

    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
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
  await connection.beginTransaction();

  try {
    const [rows] = await connection.execute(
      "UPDATE Customers SET FullName = ?, Email = ?, PhoneNumber = ?, Address = ? WHERE ID = ?",
      [fullname, email, phone, address, id],
    );

    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}

export async function deleteCustomer(id: number) {
  await connection.beginTransaction();

  try {
    const [rows] = await connection.execute(
      "DELETE FROM Customers WHERE ID = ?",
      [id],
    );

    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}

export async function getCustomerById(id: number) {
  await connection.beginTransaction();

  try {
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Customers WHERE ID = ?",
      [id],
    );

    await connection.commit();
    return rows[0] || null;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}
