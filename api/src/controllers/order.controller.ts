import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { Authentication } from "../middleware/jwt";
import OrderModel, { Order } from "../models/order.model";

interface IRequestParams {
  [key: string]: string;
}

export const createOrder: RequestHandler<
  IRequestParams,
  unknown,
  Order,
  Authentication
> = async (req, res, next) => {
  const newOrder = new OrderModel({
    userId: req.auth.userId,
    products: [req.body.products],
    orderNumber: req.body.orderNumber,
    totalPrice: req.body.totalPrice,
    delivery: "самовивіз",
    payment_intent: "оплата картою",
  });

  try {
    if (req.body.totalPrice < 200) {
      throw createHttpError(
        403,
        "Замовлення повинно бути не менше ніж на 200 грн"
      );
    }
    const createdOrder = await newOrder.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders: RequestHandler<
  IRequestParams,
  unknown,
  Order,
  Authentication
> = async (req, res, next) => {
  try {
    const orders = await OrderModel.find().exec();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrder: RequestHandler<
  IRequestParams,
  unknown,
  Order,
  Authentication
> = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    if (!mongoose.isValidObjectId(orderId)) {
      throw createHttpError(400, "Invalid order id");
    }

    const order = await OrderModel.findById(orderId).exec();

    if (!order) {
      throw createHttpError(404, "Product not found");
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const getUserOrders: RequestHandler<
  IRequestParams,
  unknown,
  Order,
  Authentication
> = async (req, res, next) => {
  const userId = req.params.orderId;
  try {
    if (!mongoose.isValidObjectId(userId)) {
      throw createHttpError(400, "Invalid User id");
    }
    const orders = await OrderModel.find({
      userId: req.auth.userId,
    }).exec();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// export const updateProduct: RequestHandler<
//   IRequestParams,
//   unknown,
//   Product,
//   Authentication
// > = async (req, res, next) => {
//   const productId = req.params.productId;
//   const newTitle = req.body.title;
//   const newDesc = req.body.desc;
//   const newCategory = req.body.category;
//   const newPrice = req.body.price;
//   const newCover = req.body.cover;
//   const newIngredients = req.body.ingredients;
//   const newStarNumber = req.body.starNumber;
//   const newImages = req.body.images;
//   try {
//     if (!mongoose.isValidObjectId(productId)) {
//       throw createHttpError(400, "Invalid product id");
//     }
//     if (!newTitle || !newCategory || !newPrice || !newCover) {
//       throw createHttpError(
//         400,
//         "Product must have a title, category, price and cover"
//       );
//     }

//     const product = await ProductModel.findById(productId).exec();

//     if (!product) {
//       throw createHttpError(404, "Product not found");
//     }

//     product.title = newTitle;
//     product.desc = newDesc;
//     product.category = newCategory;
//     product.price = newPrice;
//     product.cover = newCover;
//     product.ingredients = newIngredients;
//     product.starNumber = newStarNumber;
//     product.images = newImages;

//     const updatedProduct = await product.save();

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     next(error);
//   }
// };
