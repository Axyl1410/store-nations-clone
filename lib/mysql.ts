import mysql from "mysql2/promise";

export const connection = await mysql.createConnection({
  uri: process.env.SQL_URI || "mysql://root:root@localhost:3306/csdl",
});
