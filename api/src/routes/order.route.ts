import express from "express";
import {
  completeOrder,
  updateOrder,
  createOrder,
  getAllOrders,
  getOrder,
  getUserOrders,
  getLastOrder,
} from "../controllers/order.controller";
import { verifyToken } from "../middleware/jwt";

const router = express.Router();

router.post("/", createOrder);
router.get("/", verifyToken, getAllOrders);
router.get("/user/:userId", verifyToken, getUserOrders);
router.get("/id/:orderId", verifyToken, getOrder);
router.get("/last", getLastOrder);
router.patch("/update/:orderId", verifyToken, updateOrder);
router.patch("/complete/:orderId", verifyToken, completeOrder);

export default router;
