import { RequestHandler } from "express";
import UserModel, { User } from "../models/user.model";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import { Authentication } from "../middleware/jwt";

interface IRequestParams {
  [key: string]: string;
}

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.findById(req.params.userId).exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler<
  IRequestParams,
  unknown,
  User,
  Authentication
> = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.userId)) {
      throw createHttpError(400, "Invalid user id");
    }
    const user = await UserModel.findById(req.params.userId);

    if (req.auth.userId !== user?._id.toString()) {
      throw createHttpError(403, "You can delete only your account!");
    }
    await UserModel.findByIdAndDelete(req.params.userId);
    res.status(200).send("deleted.");
  } catch (error) {
    next(error);
  }
};
