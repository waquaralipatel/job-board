import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/http-error";

const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(
    new HttpError(
      404,
      `Route ${req.method} ${req.originalUrl} not found`
    )
  );
};

export default notFound;