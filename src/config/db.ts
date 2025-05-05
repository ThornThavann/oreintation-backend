import { Pool } from 'pg';

const pool = new Pool({
  user: 'oreintation',
  host: 'localhost',
  database: 'oreintation',
  password: 'oreintation',
  port: 5435,
});

export default pool;
