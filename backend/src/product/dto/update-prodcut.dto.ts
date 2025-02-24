import { z } from "zod";
import { createProductDto } from "./create-product.dto";

export const updateProductDto = createProductDto
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one of 'name' or 'price' is required",
  });

export type UpdateProductDto = z.infer<typeof updateProductDto>;
