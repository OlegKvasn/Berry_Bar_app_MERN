import { RequestHandler } from "express";
import OrderModel from "../models/order.model";

export const getOrders: RequestHandler = async (req, res, next) => {
  try {
    const orders = await OrderModel.find().exec();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
