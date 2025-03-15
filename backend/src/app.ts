import "./config/load-env-variables";
import "./db/connect-db";
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
import { swaggerSpec } from "../docs";
import { MongoServerError } from "mongodb";
// import path from "path";

const app = express();

app.use(express.json());

/* Routes */
app.use("/api", appRouter);

/* Swagger api docs */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Serve static assets */
// app.use(express.static(path.join(process.cwd(), "frontend/dist")));

/* Serve react app */
// app.get("*", (_, res) => {
// res.sendFile(path.join(process.cwd(), "frontend/dist", "index.html"));
// });

/* Custom error handler */
app.use((error: unknown, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof MongoServerError && error.code === 11000) {
    /* Duplicate key error */
    // Extract the first duplicate field and its corresponding value.
    const duplicateField = Object.keys((error as any).keyValue)[0];
    const duplicateValue = (error as any).keyValue[duplicateField];

    // Determine the resource name based on error details.
    let resource = "Resource";
    const errmsg = (error as any).errmsg || "";
    if (errmsg.includes("posify.products")) {
      resource = "Product";
    }

    // Build a friendly error message.
    const message = `${resource} with ${duplicateField} "${duplicateValue}" already exists`;
    response
      .status(409)
      .json(
        createResponse(
          false,
          null,
          null,
          message,
          "ConflictError",
          error?.cause || null
        )
      );
  } else if (error instanceof AuthenticationError) {
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
