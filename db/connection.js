const { Pool } = require("pg");
const path = require("path");

const ENV = process.env.NODE_ENV || "development";
const pathToCorrectEnvFile = path.join(`${__dirname}/../.env.${ENV}`);

require("dotenv").config({
  path: pathToCorrectEnvFile,
});

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
} else {
  console.log("Connected to:", process.env.PGDATABASE)
}
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
});
module.exports = new Pool();