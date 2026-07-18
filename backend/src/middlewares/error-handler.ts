import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import HttpError from "../utils/http-error";

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.flatten().fieldErrors,
    });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;