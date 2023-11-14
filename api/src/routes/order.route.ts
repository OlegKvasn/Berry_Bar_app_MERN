import express from "express";
import {
  completeOrder,
  confirmOrder,
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
router.get("/id/:orderId", verifyToken, getOrder);
router.patch("/confirm/:orderId", verifyToken, confirmOrder);
router.patch("/complete/:orderId", verifyToken, completeOrder);

export default router;
