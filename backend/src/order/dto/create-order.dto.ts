import { z } from "zod";

const orderItem = z.object({
  productId: z.string(),
  price: z.number().min(0),
  quantity: z.number().min(0),
  lineTotal: z.number().min(0),
});

export const createOrderDto = z.object({
  items: orderItem.array(),
  subtotal: z.number().min(0),
  discount: z.number().min(0).max(100),
  totalAmount: z.number().min(0),
});

export type CreateOrderDto = z.infer<typeof createOrderDto>;
