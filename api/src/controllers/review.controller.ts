import { RequestHandler } from "express";
import ReviewModel, { Review } from "../models/review.model";
import createHttpError from "http-errors";
// import mongoose from "mongoose";
import { Authentication } from "../middleware/jwt";
import productModel from "../models/product.model";

interface IRequestParams {
  [key: string]: string;
}

export const createReview: RequestHandler<
  IRequestParams,
  unknown,
  Review,
  Authentication
> = async (req, res, next) => {
  const newReview = new ReviewModel({
    userId: req.auth.userId,
    productId: req.body.productId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await ReviewModel.findOne({
      productId: req.body.productId,
      userId: req.auth.userId,
    }).exec();
    if (review) {
      throw createHttpError(403, "Ви вже писали відгук до цього продукту");
    }

    const createdReview = await newReview.save();

    await productModel.findByIdAndUpdate(req.body.productId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).json(createdReview);
  } catch (error) {
    next(error);
  }
};

export const getReviews: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await ReviewModel.find({
      productId: req.params.productId,
    }).exec();

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// export const deleteReview: RequestHandler<
//   IRequestParams,
//   unknown,
//   Review,
//   Authentication
// > = async (req, res, next) => {
//   const productId = req.params.productId;

//   try {
//     if (!mongoose.isValidObjectId(productId)) {
//       throw createHttpError(400, "Invalid product id");
//     }

//     const product = await ReviewModel.findById(productId).exec();

//     if (!product) {
//       throw createHttpError(404, "Product not found");
//     }

//     await product.deleteOne();

//     res.sendStatus(204);
//   } catch (error) {
//     next(error);
//   }
// };
