require('dotenv').config();
const promise = require('bluebird'); // or any other Promise/A+ compatible library;

const initOptions = {
  promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(initOptions);

export const getDbClient = () => {
  const cn = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  };

  const db = pgp(cn);
  return db;
}
