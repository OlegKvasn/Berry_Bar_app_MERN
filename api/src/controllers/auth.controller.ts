import { RequestHandler } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import env from ".././utils/validateEnv";

export const register: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      throw createHttpError(
        400,
        "User must have a username, email and password"
      );
    }

    const exists = await UserModel.findOne({ email: req.body.email });

    if (exists) {
      throw createHttpError(400, "Email already in use");
    }

    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = await UserModel.create({
      ...req.body,
      password: hash,
    });

    res.status(200).send(newUser);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      throw createHttpError(400, "Wrong password or username");
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      env.JWT_KEY
    );

    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken", { sameSite: "none", secure: true })
      .status(200)
      .send("User has been loged out");
  } catch (error) {
    next(error);
  }
};
