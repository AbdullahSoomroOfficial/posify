import { NextFunction, Request, Response } from "express-serve-static-core";
import { ZodSchema } from "zod";
import { ValidationError } from "./error.util";

export const validate = (schema: ZodSchema) => {
  return (request: Request, _: Response, next: NextFunction): void => {
    try {
      if (!request.body) {
        throw new ValidationError("Request body is missing", null);
      }
      const result = schema.safeParse(request.body);
      if (result.success) {
        next();
      } else {
        throw new ValidationError(
          "Malformed request body",
          result.error.errors
        );
      }
    } catch (error) {
      next(error);
    }
  };
};
