import { NextFunction, Request, Response, RequestHandler } from "express";

const asyncHandler =
  (handler: RequestHandler): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };

export default asyncHandler;