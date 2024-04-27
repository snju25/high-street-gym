import mysql from "mysql2/promise";
import dotenv from "dotenv"

dotenv.config()

const URL_DATABASE = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_TCP_PROXY_DOMAIN}:${process.env.RAILWAY_TCP_PROXY_PORT}/${process.env.MYSQL_DATABASE}`
export const db = mysql.createConnection(URL_DATABASE)

// Example of error handling
