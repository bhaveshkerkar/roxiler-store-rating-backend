import pool from "../utils/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return rows[0];
};

export const createUser = async (name, email, address, password) => {
  const [result] = await pool.query(
    "INSERT INTO users (name,email,address,password) VALUES (?,?,?,?)",
    [name, email, address, password]
  );

  return result;
};