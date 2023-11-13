import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrder,
  getUserOrders,
} from "../controllers/order.controller";
import { verifyToken } from "../middleware/jwt";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getAllOrders);
router.get("/:userId", verifyToken, getUserOrders);
router.get("/:orderId", verifyToken, getOrder);

export default router;
