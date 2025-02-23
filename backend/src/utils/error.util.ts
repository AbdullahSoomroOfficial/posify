import { ZodIssue } from "zod";
import { errorType } from "../../../shared/interfaces";

export class CustomError extends Error {
  statusCode: number;
  name: errorType;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name as errorType;
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class ValidationError extends CustomError {
  errors: ZodIssue[];
  constructor(message: string, errors: ZodIssue[]) {
    super(message, 400);
    this.errors = errors;
  }
  format() {
    // Aggregate errors for each path
    const aggregatedErrors = this.errors.reduce((acc, err) => {
      const path = err.path.join("."); // Get the path for the field
      if (!acc[path]) {
        acc[path] = [];
      }
      acc[path].push(err.message); // Add all error messages for the same path
      return acc;
    }, {} as Record<string, string[]>);

    // Transform the aggregated errors into a more user-friendly format
    const formattedErrors = Object.entries(aggregatedErrors).map(
      ([path, messages]) => ({
        path,
        messages, // Combine all messages for the same path
      })
    );
    return formattedErrors;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}
