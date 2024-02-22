import mysql from "mysql2/promise";

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Radha2001",
    database: "high-street-gym-2024",
});