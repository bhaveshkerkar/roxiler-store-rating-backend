import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import {
  ownerDashboard,
  ownerRatings,
} from "../controllers/ownerController.js";

import { changePassword } from "../controllers/userController.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("owner"),
  ownerDashboard
);

router.get(
  "/ratings",
  authMiddleware,
  roleMiddleware("owner"),
  ownerRatings
);

router.put(
  "/change-password",
  authMiddleware,
  roleMiddleware("owner"),
  changePassword
);

export default router;