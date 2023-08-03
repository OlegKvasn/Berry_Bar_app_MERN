import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import userRoute from "./routes/user.route";
import productRoute from "./routes/product.route";
import orderRoute from "./routes/order.route";
import reviewRoute from "./routes/review.route";
import authRoute from "./routes/auth.route";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/orders", orderRoute);
app.use("/api/products", productRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

//eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorStatus = 500;
  let errorMessage = "An unknown error occurred";
  // if (error instanceof Error) errorMessage = error.message;
  if (isHttpError(error)) {
    errorStatus = error.status;
    errorMessage = error.message;
  }
  res.status(errorStatus).json({ error: errorMessage });
  //return res.status(errorStatus).send(errorMessage);
});

export default app;
