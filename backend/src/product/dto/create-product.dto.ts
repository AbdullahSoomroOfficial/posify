import { z } from "zod";

export const createProductDto = z.object({
  name: z.string(),
  price: z.number(),
});

export type CreateProductDto = z.infer<typeof createProductDto>;
