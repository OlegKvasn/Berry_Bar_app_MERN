import express from "express";
import { deleteUser, getUsers } from "../controllers/user.controller";
import { verifyToken } from "../middleware/jwt";

const router = express.Router();

router.get("/", getUsers);
router.delete("/:userId", verifyToken, deleteUser);

export default router;
