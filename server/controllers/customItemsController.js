import pool from "../config/database.js";

export const getAllItems = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM custom_items ORDER BY id DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM custom_items WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error getting item:", error);
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

export const createItem = async (req, res) => {
  try {
    const { name, exterior, roof, wheels, interior, convertible, price } =
      req.body;

    if (!name || !exterior || !roof || !wheels || !interior || price == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      `INSERT INTO custom_items
      (name, exterior, roof, wheels, interior, convertible, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [name, exterior, roof, wheels, interior, convertible, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Failed to create item" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, exterior, roof, wheels, interior, convertible, price } =
      req.body;

    const result = await pool.query(
      `UPDATE custom_items
       SET name = $1,
           exterior = $2,
           roof = $3,
           wheels = $4,
           interior = $5,
           convertible = $6,
           price = $7
       WHERE id = $8
       RETURNING *`,
      [name, exterior, roof, wheels, interior, convertible, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM custom_items WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
};
