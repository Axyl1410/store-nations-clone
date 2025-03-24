
import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/lib/mysql";

// Lấy danh sách bình luận theo ProductID
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
        return NextResponse.json({ message: "Missing productId" }, { status: 400 });
    }

    try {
        const [rows] = await connection.query(
            `SELECT c.CommentID, c.ProductID, c.CustomerID, cu.FullName, p.ProductName, c.Content, c.CreatedAt
            FROM Comments c
            JOIN Customers cu ON c.CustomerID = cu.CustomerID
            JOIN Products p ON c.ProductID = p.ProductID
            WHERE c.ProductID = ? 
            ORDER BY c.CreatedAt DESC`,
            [productId]
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ message: "Database error", error }, { status: 500 });
    }
}

// Thêm bình luận mới
export async function POST(req: NextRequest) {
    try {
        const { productId, customerId, content } = await req.json();

        if (!productId || !customerId || !content) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        // Lấy tên sản phẩm từ bảng Products
        const [productRows] = await connection.query(
            "SELECT ProductName FROM Products WHERE ProductID = ?",
            [productId]
        );
        const productName = (productRows as { ProductName: string }[])[0].ProductName;

        // Lấy tên khách hàng từ bảng Customers
        const [customerRows] = await connection.query(
            "SELECT FullName FROM Customers WHERE CustomerID = ?",
            [customerId]
        );
        const fullName = (customerRows as {FullName: string}[])[0].FullName;

        // Chèn bình luận vào database
        const [result]: any = await connection.query(
            `INSERT INTO Comments (ProductID, CustomerID, FullName, ProductName, Content) 
            VALUES (?, ?, ?, ?, ?)`,
            [productId, customerId, fullName, productName, content]
        );

        return NextResponse.json({
            id: result.insertId,
            productId,
            customerId,
            fullName,
            productName,
            content,
            createdAt: new Date().toISOString(),
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Database error", error }, { status: 500 });
    }
}
