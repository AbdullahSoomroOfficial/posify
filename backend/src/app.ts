import express from "express";
import { appRouter } from "./app.router";
import { createResponse } from "./utils/response.util";
import { Request, Response, NextFunction } from "express-serve-static-core";
import {
  AuthenticationError,
  BadRequestError,
  ConflictError,
  CustomError,
  NotFoundError,
  ValidationError,
} from "./utils/error.util";
import { errorType } from "../../shared/interfaces";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const app = express();

/* Swagger setup */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "POSify API",
      version: "1.0.0",
      description: "API documentation for POSify",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./src/**/*.ts", "../backend/doc/index.ts"], // Path to the API docs
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerOptions))
);

app.use("/api", appRouter);

/* Custom error handler */
app.use((error: unknown, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof AuthenticationError) {
    /* Clear the cookie if authentication fails */
    response.clearCookie("AUTH_TOKEN");
    response
      .status(error.statusCode)
      .json(createResponse(false, null, null, error.message, error.name, null));
  } else if (error instanceof ValidationError) {
    const formattedErrors = error.format();
    response
      .status(error.statusCode)
      .json(
        createResponse(
          false,
          null,
          null,
          error.message,
          error.name,
          formattedErrors
        )
      );
  } else if (
    error instanceof ConflictError ||
    error instanceof CustomError ||
    error instanceof NotFoundError ||
    error instanceof BadRequestError
  ) {
    response
      .status(error.statusCode)
      .json(createResponse(false, null, null, error.message, error.name, null));
  } else {
    response
      .status(500)
      .json(
        createResponse(
          false,
          null,
          null,
          "Internal server error",
          (error as Error).name as errorType,
          null
        )
      );
  }
});

export { app };
