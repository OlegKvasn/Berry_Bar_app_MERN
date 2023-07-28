import { RequestHandler } from "express";
import ReviewModel from "../models/review.model";

export const getReviews: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await ReviewModel.find().exec();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
