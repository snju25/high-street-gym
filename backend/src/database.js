import mysql from "mysql2/promise";
import dotenv from "dotenv"

dotenv.config()

export const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER_DSB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});