/* Entitites */
export interface Product {
  _id: string;
  name: string;
  price: number;
}

export interface Stock {
  _id: string;
  productId: string;
  quantity: number;
}

export interface Order {
  items: [
    {
      productId: string;
      price: number;
      quantity: number;
      lineTotal: number;
    }
  ];
  subtotal: number;
  discount: number;
  totalAmount: number;
}

/* Response */
export type errorType =
  | "CustomError"
  | "AuthenticationError"
  | "ConflictError"
  | "ValidationError"
  | "NotFoundError"
  | "BadRequestError";

export interface ResponseBody {
  success: boolean;
  data: object | null;
  successMessage: string | null;
  errorMessage: string | null;
  error: { errorType: errorType | null; cause: object | null } | null;
}
