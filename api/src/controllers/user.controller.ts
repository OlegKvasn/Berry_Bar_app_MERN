import { Request, RequestHandler } from "express";
import UserModel from "../models/user.model";
import mongoose from "mongoose";
import createHttpError from "http-errors";

export interface Authentication {
  userId: string;
}

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.find().exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.userId)) {
      throw createHttpError(400, "Invalid user id");
    }
    const authenticatedReq = req as Request & Authentication;
    const user = await UserModel.findById(req.params.userId);

    if (authenticatedReq.userId !== user?._id.toString()) {
      throw createHttpError(403, "You can delete only your account!");
    }
    await UserModel.findByIdAndDelete(req.params.userId);
    res.status(200).send("deleted.");
  } catch (error) {
    next(error);
  }
};
