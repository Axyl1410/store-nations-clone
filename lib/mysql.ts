import mysql from "mysql2/promise";

// Create the connection to database
export const connection = await mysql.createConnection({
  uri: process.env.SQL_URI || "mysql://root:root@localhost:3306/csdl",
});
