import { Pool } from 'pg';
import env from 'dotenv';

env.config();

// Parse port as integer
const port: number = +process.env.POSTGRES_PORT;

function connect() {
  return new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port,
  });
}

export default {
  connect,
};
