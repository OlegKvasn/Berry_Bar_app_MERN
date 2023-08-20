import express from "express";
import {
  createReview,
  // deleteReview,
  getReviews,
} from "../controllers/review.controller";
import { verifyToken } from "../middleware/jwt";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:productId", getReviews);
// router.delete("/", verifyToken, deleteReview);

export default router;
