import { connection } from "@/lib/mysql";
import mysql from "mysql2/promise";

interface getComment {
  productID: number;
  customerID: number;
}

interface createComment extends getComment {
  comment: string;
}

//todo fix later
export async function createComment({
  productID,
  customerID,
  comment,
}: createComment) {
  await connection.beginTransaction();

  try {
    const [rows] = await connection.execute(
      "INSERT INTO Comments (ProductID, CustomerID, Comment) VALUES (?, ?, ?)",
      [productID, customerID, comment],
    );

    await connection.commit();
    return rows;
  } catch {
    await connection.rollback();
    throw new Error("Error creating comment");
  }
}

export async function getComment({ productID, customerID }: getComment) {
  await connection.beginTransaction();

  try {
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM Comments WHERE ProductID = ? AND CustomerID = ?",
      [productID, customerID],
    );

    await connection.commit();
    return rows;
  } catch {
    await connection.rollback();
    throw new Error("Error getting comment");
  }
}
