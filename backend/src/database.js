import mysql from "mysql2/promise";
import dotenv from "dotenv"

dotenv.config()

const URL_DATABASE = `mysql://root:BheSEIIERRkHJdkIuJHbiAPFSgnDFPvG@monorail.proxy.rlwy.net:40501/railway`
export const db = mysql.createPool(URL_DATABASE)


// Example of error handling

