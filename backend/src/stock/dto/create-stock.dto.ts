import { z } from "zod";
import { Types } from "mongoose";

export const createStockDto = z.object({
  productId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid productId",
  }),
  quantity: z.number().min(0),
});

export type CreateStockDto = z.infer<typeof createStockDto>;
