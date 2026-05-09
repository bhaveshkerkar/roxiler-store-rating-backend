import { getAllStores } from "../models/storeModel.js";

export const fetchStores = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    const stores = await getAllStores(userId);

    res.status(200).json({
      success: true,
      stores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};