import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller";
import { verifyToken } from "../middleware/jwt";

const router = express.Router();

router.get("/:userId", getUser);
router.delete("/:userId", verifyToken, deleteUser);

export default router;
