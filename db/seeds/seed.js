const format = require("pg-format");
const db = require("../connection");

const seed = ({ validData, invalidData }) => {
  return db
    .query(`DROP TABLE IF EXISTS validData, invalidData;`)
    .then(() => {
      return db.query(`
        CREATE TABLE validData (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE invalidData (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(255),
          email VARCHAR(255),
          error_reason TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
    })
    .then(() => {
      if (validData.length) {
        const insertValidData = format(
          `INSERT INTO validData (full_name, email, created_at) VALUES %L`,
          validData.map(({ full_name, email, created_at }) => [
            full_name,
            email,
            created_at || new Date(),
          ])
        );
        return db.query(insertValidData);
      }
    })
    .then(() => {
      if (invalidData.length) {
        const insertInvalidData = format(
          `INSERT INTO invalidData (full_name, email, error_reason, created_at) VALUES %L`,
          invalidData.map(({ full_name, email, error_reason, created_at }) => [
            full_name,
            email,
            error_reason,
            created_at || new Date(),
          ])
        );
        return db.query(insertInvalidData);
      }
    })
    .catch((err) => {
      console.error("Error during seeding:", err);
    });
};

module.exports = seed;