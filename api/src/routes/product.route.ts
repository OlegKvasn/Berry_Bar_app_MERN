import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import { verifyToken } from "../middleware/jwt";

const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", getProduct);
router.post("/", verifyToken, createProduct);
router.patch("/:productId", verifyToken, updateProduct);
router.delete("/:productId", verifyToken, deleteProduct);

export default router;
