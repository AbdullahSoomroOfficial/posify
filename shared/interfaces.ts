export type errorType =
  | "CustomError"
  | "AuthenticationError"
  | "ConflictError"
  | "ValidationError";

export interface ResponseBody {
  success: boolean;
  data: object | null;
  successMessage: string | null;
  errorMessage: string | null;
  error: { errorType: errorType | null; cause: object | null } | null;
}
