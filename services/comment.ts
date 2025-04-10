import { connection } from "@/lib/mysql";
import mysql from "mysql2/promise";

interface getComment {
  productID: number;
}

interface createComment extends getComment {
  customerID: number;
  content: string;
  fullname: string;
}

export async function createComment({
  productID,
  customerID,
  content,
  fullname,
}: createComment) {
  await connection.beginTransaction();

  try {
    const [rows] = await connection.execute(
      "INSERT INTO Comments (ProductID, CustomerID, FullName, Content) VALUES (?, ?, ?, ?)",
      [productID, customerID, fullname, content],
    );

    await connection.commit();
    return rows;
  } catch {
    await connection.rollback();
    throw new Error("Error creating comment");
  }
}

export async function getComment({ productID }: getComment) {
  await connection.beginTransaction();

  try {
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Comments WHERE ProductID = ?",
      [productID],
    );

    await connection.commit();
    return rows;
  } catch {
    await connection.rollback();
    throw new Error("Error getting comment");
  }
}
