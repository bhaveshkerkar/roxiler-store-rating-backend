import { getOwnerStore } from "../models/storeModel.js";
import { getStoreRatingsByOwner } from "../models/ratingModel.js";

export const ownerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await getOwnerStore(ownerId);

    res.status(200).json({
      success: true,
      store,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const ownerRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const ratings = await getStoreRatingsByOwner(ownerId);

    res.status(200).json({
      success: true,
      count: ratings.length,
      ratings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};