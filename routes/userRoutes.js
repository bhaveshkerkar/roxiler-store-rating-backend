import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import {
  submitRating,
  updateRating,
  searchAllStores,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, roleMiddleware("user"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome User",
    user: req.user,
  });
});

// router.get("/user/stores", fetchAllStores);

router.post("/rate", authMiddleware, roleMiddleware("user"), submitRating);

router.put("/rate", authMiddleware, roleMiddleware("user"), updateRating);

router.get(
  "/stores/search",
  authMiddleware,
  roleMiddleware("user"),
  searchAllStores,
);

router.put(
  "/change-password",
  authMiddleware,
  roleMiddleware("user"),
  changePassword,
);

export default router;
