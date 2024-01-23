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
    ...(q.search && {
      $or: [
        {
          title: { $regex: q.search, $options: "i" },
        },
        { title_en: { $regex: q.search, $options: "i" } },
      ],
    }),
    ...(q.category && { category: q.category }),
    ...(q.new && { isNewIncome: q.new }),
    ...(q.hot && { isHot: q.hot }),
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
      !req.body.title_en ||
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
  const newTitleEn = req.body.title_en;
  const newDesc = req.body.desc;
  const newDescEn = req.body.desc_en;
  const newCategory = req.body.category;
  const newPrice = req.body.price;
  const newSalePrice = req.body.salePrice;
  const newCover = req.body.cover;
  const newIngredients = req.body.ingredients;
  const newIngredientsEn = req.body.ingredients_en;
  const newImages = req.body.images;
  const newIsVegan = req.body.isVegan;
  const newIsNewIncome = req.body.isNewIncome;
  const newIsHot = req.body.isHot;
  const newIsDeal = req.body.isDeal;
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
    product.title_en = newTitleEn;
    product.desc = newDesc;
    product.desc_en = newDescEn;
    product.category = newCategory;
    product.price = newPrice;
    product.salePrice = newSalePrice;
    product.cover = newCover;
    product.ingredients = newIngredients;
    product.ingredients_en = newIngredientsEn;
    product.images = newImages;
    product.isVegan = newIsVegan;
    product.isNewIncome = newIsNewIncome;
    product.isHot = newIsHot;
    product.isDeal = newIsDeal;

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
