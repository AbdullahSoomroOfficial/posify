import { z } from "zod";

export const createOrderDto = z.object({
  items: z
    .object({
      productId: z.string(),
      quantity: z.number().min(0),
    })
    .array()
    .refine((value) => value.length > 0, {
      message: "Order must contain at least one item",
    }),
  discount: z.number().min(0).max(100),
});

export type CreateOrderDto = z.infer<typeof createOrderDto>;
