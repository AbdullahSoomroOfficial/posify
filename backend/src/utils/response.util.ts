import { ResponseBody, errorType } from "../../../shared/interfaces";

export const createResponse = (
  success: boolean,
  data: object | null,
  successMessage: string | null,
  errorMessage: string | null,
  errorType: errorType | null,
  cause: object | null
): ResponseBody => {
  return {
    success,
    data,
    successMessage,
    errorMessage,
    error: { errorType, cause },
  };
};
