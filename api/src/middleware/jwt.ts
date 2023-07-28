import jwt, { VerifyOptions } from "jsonwebtoken";
import env from ".././utils/validateEnv";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export interface Payload {
  id: string;
  isAdmin: boolean;
}

export interface Authentication {
  userId: string;
  isAdmin: boolean;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  try {
    if (!token) {
      throw createHttpError(401, "You are not authenticated!");
    }

    const verifyOptions: VerifyOptions = {};

    jwt.verify(token, env.JWT_KEY, verifyOptions, async (error, payload) => {
      if (error) {
        throw createHttpError(403, "Token is not valid!");
      }
      const payloadWithType = payload as Payload;
      const authenticatedReq = req as Request & Authentication;
      authenticatedReq.userId = payloadWithType?.id ?? "";
      authenticatedReq.isAdmin = payloadWithType?.isAdmin ?? false;
      next();
    });
  } catch (error) {
    next(error);
  }
};
