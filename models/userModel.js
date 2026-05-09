import pool from "../utils/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  return rows[0];
};

export const createUser = async (
  name,
  email,
  address,
  password,
  role = "user",
) => {
  const [result] = await pool.query(
    "INSERT INTO users (name,email,address,password, role) VALUES (?,?,?,?,?)",
    [name, email, address, password, role],
  );

  return result;
};

export const updatePassword = async (userId, hashedPassword) => {
  const [result] = await pool.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [hashedPassword, userId],
  );

  return result;
};

export const createUserWithRole = async (
  name,
  email,
  address,
  password,
  role,
) => {
  const [result] = await pool.query(
    "INSERT INTO users (name,email,address,password,role) VALUES (?,?,?,?,?)",
    [name, email, address, password, role],
  );

  return result;
};
