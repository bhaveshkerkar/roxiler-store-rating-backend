import pool from "../utils/db.js";

export const getDashboardStats = async () => {
  const [[users]] = await pool.query(
    "SELECT COUNT(*) AS totalUsers FROM users",
  );

  const [[stores]] = await pool.query(
    "SELECT COUNT(*) AS totalStores FROM stores",
  );

  const [[ratings]] = await pool.query(
    "SELECT COUNT(*) AS totalRatings FROM ratings",
  );

  return {
    totalUsers: users.totalUsers,
    totalStores: stores.totalStores,
    totalRatings: ratings.totalRatings,
  };
};

export const getAllUsers = async () => {
  const [rows] = await pool.query(`
    SELECT
      u.id,
      u.name,
      u.email,
      u.address,
      u.role,
      CASE
        WHEN u.role = 'owner'
        THEN COALESCE(ROUND(AVG(r.rating),1),0)
        ELSE NULL
      END AS averageRating
    FROM users u
    LEFT JOIN stores s ON u.id = s.owner_id
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `);

  return rows;
};

export const getAllStoresAdmin = async () => {
  const [rows] = await pool.query(`
    SELECT
      s.id,
      s.name,
      s.email,
      s.address,
      COALESCE(ROUND(AVG(r.rating),1),0) AS averageRating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
    ORDER BY s.created_at DESC
  `);

  return rows;
};