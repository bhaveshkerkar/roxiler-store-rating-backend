import pool from "../utils/db.js";

export const addRating = async (userId, storeId, rating) => {
  const [result] = await pool.query(
    "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
    [userId, storeId, rating]
  );

  return result;
};

export const updateUserRating = async (userId, storeId, rating) => {
  const [result] = await pool.query(
    "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?",
    [rating, userId, storeId]
  );

  return result;
};

export const getStoreRatingsByOwner = async (ownerId) => {
  const [rows] = await pool.query(
    `
    SELECT
      u.name,
      u.email,
      r.rating
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    JOIN stores s ON r.store_id = s.id
    WHERE s.owner_id = ?
    ORDER BY r.rating DESC
    `,
    [ownerId]
  );

  return rows;
};