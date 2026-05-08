import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import {
  adminDashboard,
  addUser,
  addStore,
  getUsers,
  getStores,
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  adminDashboard,
);

router.post("/add-user", authMiddleware, roleMiddleware("admin"), addUser);

router.post("/add-store", authMiddleware, roleMiddleware("admin"), addStore);

router.get("/users", authMiddleware, roleMiddleware("admin"), getUsers);

router.get("/stores", authMiddleware, roleMiddleware("admin"), getStores);

export default router;
