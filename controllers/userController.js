import { getAllStores, searchStores } from "../models/storeModel.js";
import { addRating, updateUserRating } from "../models/ratingModel.js";

import { findUserByEmail, updatePassword } from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/hash.js";

// export const fetchAllStores = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const stores = await getAllStores(userId);

//     res.status(200).json({
//       success: true,
//       count: stores.length,
//       stores,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const submitRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;

    if (!storeId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Store ID and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    await addRating(userId, storeId, rating);

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "You have already rated this store",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;

    if (!storeId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Store ID and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const result = await updateUserRating(userId, storeId, rating);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "No rating found to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rating updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const searchAllStores = async (req, res) => {
  try {
    const { name = "", address = "" } = req.query;

    const userId = req.user.id;
    const stores = await searchStores(userId, name, address);

    res.status(200).json({
      success: true,
      count: stores.length,
      stores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
    }

    const user = await findUserByEmail(userEmail);

    const isMatch = await comparePassword(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    await updatePassword(userId, hashedPassword);

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
