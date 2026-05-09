import pool from "../utils/db.js";

export const getAllStores = async (userId = null) => {
  let query = "";
  let values = [];

  if (userId) {
    query = `
      SELECT
        s.id,
        s.name,
        s.address,
        COALESCE(ROUND(AVG(r.rating),1),0) AS overallRating,
        (
          SELECT rating
          FROM ratings
          WHERE user_id = ? AND store_id = s.id
          LIMIT 1
        ) AS userRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
      ORDER BY s.name ASC
    `;

    values = [userId];
  } else {
    query = `
      SELECT
        s.id,
        s.name,
        s.address,
        COALESCE(ROUND(AVG(r.rating),1),0) AS overallRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
      ORDER BY s.name ASC
    `;
  }

  const [rows] = await pool.query(query, values);

  return rows;
};

export const searchStores = async (userId, name = "", address = "") => {
  const [rows] = await pool.query(
    `
    SELECT
      s.id,
      s.name,
      s.address,
      COALESCE(ROUND(AVG(r.rating),1),0) AS overallRating,
      (
        SELECT rating
        FROM ratings
        WHERE user_id = ? AND store_id = s.id
        LIMIT 1
      ) AS userRating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.name LIKE ? AND s.address LIKE ?
    GROUP BY s.id
    ORDER BY s.name ASC
    `,
    [userId, `%${name}%`, `%${address}%`],
  );

  return rows;
};

export const getOwnerStore = async (ownerId) => {
  const [rows] = await pool.query(
    `
    SELECT 
      s.id,
      s.name,
      s.address,
      COALESCE(ROUND(AVG(r.rating),1),0) AS averageRating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.owner_id = ?
    GROUP BY s.id
    `,
    [ownerId],
  );

  return rows[0];
};

export const createStore = async (name, email, address, ownerId) => {
  const [result] = await pool.query(
    "INSERT INTO stores (name,email,address,owner_id) VALUES (?,?,?,?)",
    [name, email, address, ownerId],
  );

  return result;
};
