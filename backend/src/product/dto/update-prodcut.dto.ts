import { z } from "zod";
import { updateProductDto } from "../../../../shared/interfaces";

export type UpdateProductDto = z.infer<typeof updateProductDto>;
