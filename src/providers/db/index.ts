import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";
 
dotenv.config();

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, DB_PORT } = process.env;

 

const db_config: { [key: string]: any } = {
  host: DB_HOST || "localhost",
  port: DB_PORT,
  user: DB_USERNAME || "root",
  password: DB_PASSWORD || "",
  database: DB_NAME,
  ssl: false,
  dateStrings: true
};

const db: Pool = mysql.createPool(db_config);

export default db;
