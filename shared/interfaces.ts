import {
  createProductDto,
  updateProductDto,
  createStockDto,
  updateStockDto,
  createOrderDto,
  updateOrderDto,
} from "./dto";
import { TypeOf } from "../backend/node_modules/zod";

/* Entitites start */
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
  _id: string;
  items: [
    {
      productId: string;
      price: number;
      quantity: number;
      lineTotal: number;
    }
  ];
  subTotal: number;
  discount: number;
  totalAmount: number;
}
/* Entitites end */

export interface Analytics {
  todaySales: number;
  lastMonthSales: number;
  lastSixMonthsSales: number;
}

export type CreateProductDto = TypeOf<typeof createProductDto>;
export type UpdateProductDto = TypeOf<typeof updateProductDto>;
export type CreateStockDto = TypeOf<typeof createStockDto>;
export type UpdateStockDto = TypeOf<typeof updateStockDto>;
export type CreateOrderDto = TypeOf<typeof createOrderDto>;
export type UpdateOrderDto = TypeOf<typeof updateOrderDto>;

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
