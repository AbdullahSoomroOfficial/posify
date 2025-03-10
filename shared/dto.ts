/* DTO's */
import { z } from "../backend/node_modules/zod";

export const createProductDto = z
  .object({
    name: z.string(),
    price: z.coerce.number(),
  })
  .strip();

export const updateProductDto = createProductDto
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one of 'name' or 'price' is required",
  });

export const createStockDto = z
  .object({
    productId: z.string(),
    quantity: z.coerce.number().min(0),
  })
  .strip();

export const updateStockDto = createStockDto.pick({ quantity: true });

export const createOrderDto = z
  .object({
    items: z
      .object({
        productId: z.string(),
        quantity: z.number().min(1),
      })
      .array()
      .refine((value) => value.length > 0, {
        message: "Order must contain at least one item",
      }),
    discount: z.number().min(0).max(100),
  })
  .strip();

export const updateOrderDto = createOrderDto;
