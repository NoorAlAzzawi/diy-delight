import pool from "./database.js";

const createTable = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS custom_items;

      CREATE TABLE custom_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        exterior VARCHAR(100) NOT NULL,
        roof VARCHAR(100) NOT NULL,
        wheels VARCHAR(100) NOT NULL,
        interior VARCHAR(100) NOT NULL,
        convertible BOOLEAN DEFAULT false,
        price INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("custom_items table created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating table:", error);
    process.exit(1);
  }
};

createTable();
