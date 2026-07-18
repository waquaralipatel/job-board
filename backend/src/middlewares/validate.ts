import { ZodType } from "zod";
import { NextFunction, Request, Response } from "express";

const validate =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      next(error);
    }
  };

export default validate;