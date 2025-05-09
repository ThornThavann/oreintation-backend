import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
// console.log(process.env.DBUSER);
// console.log(process.env.HOST);
// console.log(process.env.DATABASE);
// console.log(process.env.PASSWORD);
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

export default pool;