import { connection } from "./mysql";

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
