import { findUserByEmail, createUserWithRole } from "../models/userModel.js";
import { hashPassword } from "../utils/hash.js";
import { createStore } from "../models/storeModel.js";
import { getDashboardStats, getAllUsers, getAllStoresAdmin } from "../models/adminModel.js";

export const adminDashboard = async (req, res) => {
  try {
    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    if (!name || !email || !address || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    await createUserWithRole(name, email, address, hashedPassword, role);

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await createStore(name, email, address, ownerId);

    res.status(201).json({
      success: true,
      message: "Store created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStores = async (req, res) => {
  try {
    const stores = await getAllStoresAdmin();

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