import mysql from "mysql2/promise";
import dotenv from "dotenv"

dotenv.config()

const URL_DATABASE = `mysql://root:jcsZMNxPBZdWcosAJhpVRBeRFmvpxqLG@viaduct.proxy.rlwy.net:26192/railway`
export const db = mysql.createPool(URL_DATABASE)

// Example of error handling
