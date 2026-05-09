import express from "express";
import { fetchStores } from "../controllers/storeController.js";
import optionalAuth from "../middlewares/optionalAuth.js";

const router = express.Router();

router.get("/", optionalAuth, fetchStores);

export default router;
