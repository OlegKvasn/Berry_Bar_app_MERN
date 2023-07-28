import { RequestHandler } from "express";
import ProductModel, { Product } from "../models/product.model";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await ProductModel.find().exec();
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
  unknown,
  unknown,
  Product,
  unknown
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

interface UpdateProductParams {
  productId: string;
}

export const updateProduct: RequestHandler<
  UpdateProductParams,
  unknown,
  Product,
  unknown
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
    if (!newTitle) {
      throw createHttpError(400, "Product must have a title");
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

export const deleteProduct: RequestHandler = async (req, res, next) => {
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
