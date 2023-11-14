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
    products: req.body.products,
    orderNumber: req.body.orderNumber,
    totalPrice: req.body.totalPrice,
    delivery: "самовивіз",
    paymentMethod: "термінал",
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
  const userId = req.params.userId;
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

export const confirmOrder: RequestHandler<
  IRequestParams,
  unknown,
  Order,
  Authentication
> = async (req, res, next) => {
  const orderId = req.params.orderId;
  const confirmedProducts = req.body.products;
  const confirmedTotalPrice = req.body.totalPrice;
  const confirmedDelivery = req.body.delivery;
  const confirmedPaymentMethod = req.body.paymentMethod;
  const confirmedOrderStatus = "confirmed";
  try {
    if (!mongoose.isValidObjectId(orderId)) {
      throw createHttpError(400, "Invalid order id");
    }
    if (confirmedTotalPrice < 200) {
      throw createHttpError(
        403,
        "Замовлення повинно бути не менше ніж на 200 грн"
      );
    }

    const order = await OrderModel.findById(orderId).exec();

    if (!order) {
      throw createHttpError(404, "Order not found");
    }

    order.products = confirmedProducts;
    order.totalPrice = confirmedTotalPrice;
    order.delivery = confirmedDelivery;
    order.paymentMethod = confirmedPaymentMethod;
    order.orderStatus = confirmedOrderStatus;

    const confirmedOrder = await order.save();

    res.status(200).json(confirmedOrder);
  } catch (error) {
    next(error);
  }
};

export const completeOrder: RequestHandler<
  IRequestParams,
  unknown,
  Order,
  Authentication
> = async (req, res, next) => {
  const orderId = req.params.orderId;
  const confirmedOrderStatus = "completed";
  try {
    if (!mongoose.isValidObjectId(orderId)) {
      throw createHttpError(400, "Invalid order id");
    }

    const order = await OrderModel.findById(orderId).exec();

    if (!order) {
      throw createHttpError(404, "Order not found");
    }

    order.orderStatus = confirmedOrderStatus;

    const completedOrder = await order.save();

    res.status(200).json(completedOrder);
  } catch (error) {
    next(error);
  }
};
