import { RequestHandler } from "express";
import ProductModel, { Product } from "../models/product.model";
import createHttpError from "http-errors";
import mongoose, { SortOrder } from "mongoose";
import { Authentication } from "../middleware/jwt";

interface IRequestParams {
  [key: string]: string;
}

export const getProducts: RequestHandler = async (req, res, next) => {
  const q = req.query;
  // const filters = {
  //   title: { $regex: q.search, $options: "i" },
  //   category: q.category,
  // };
  const filters = {
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    ...(q.category && { category: q.category }),
  };

  const sortOptions: { [key: string]: SortOrder } = {};
  if (q.sort) {
    sortOptions[q.sort as string] = -1;
  }

  try {
    const products = await ProductModel.find(filters).sort(sortOptions).exec();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProduct: RequestHandler = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, "Invalid product id");
    }

    const product = await ProductModel.findById(productId).exec();

    if (!product) {
      throw createHttpError(404, "Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct: RequestHandler<
  IRequestParams,
  unknown,
  Product,
  Authentication
> = async (req, res, next) => {
  try {
    if (
      !req.body.title ||
      !req.body.category ||
      !req.body.price ||
      !req.body.cover
    ) {
      throw createHttpError(
        400,
        "Product must have a title, category, price and cover"
      );
    }

    const newProduct = await ProductModel.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct: RequestHandler<
  IRequestParams,
  unknown,
  Product,
  Authentication
> = async (req, res, next) => {
  const productId = req.params.productId;
  const newTitle = req.body.title;
  const newDesc = req.body.desc;
  const newCategory = req.body.category;
  const newPrice = req.body.price;
  const newCover = req.body.cover;
  const newIngredients = req.body.ingredients;
  const newStarNumber = req.body.starNumber;
  const newImages = req.body.images;
  try {
    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, "Invalid product id");
    }
    if (!newTitle || !newCategory || !newPrice || !newCover) {
      throw createHttpError(
        400,
        "Product must have a title, category, price and cover"
      );
    }

    const product = await ProductModel.findById(productId).exec();

    if (!product) {
      throw createHttpError(404, "Product not found");
    }

    product.title = newTitle;
    product.desc = newDesc;
    product.category = newCategory;
    product.price = newPrice;
    product.cover = newCover;
    product.ingredients = newIngredients;
    product.starNumber = newStarNumber;
    product.images = newImages;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: RequestHandler<
  IRequestParams,
  unknown,
  Product,
  Authentication
> = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, "Invalid product id");
    }

    const product = await ProductModel.findById(productId).exec();

    if (!product) {
      throw createHttpError(404, "Product not found");
    }

    await product.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
