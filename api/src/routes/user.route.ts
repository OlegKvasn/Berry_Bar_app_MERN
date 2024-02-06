import express from "express";
import {
  addFavorite,
  deleteFavorite,
  deleteUser,
  getUser,
} from "../controllers/user.controller";
import { verifyToken } from "../middleware/jwt";

const router = express.Router();

router.get("/:userId", getUser);
router.delete("/:userId", verifyToken, deleteUser);
router.patch("/add/:productId", verifyToken, addFavorite);
router.patch("/delete/:productId", verifyToken, deleteFavorite);

export default router;
