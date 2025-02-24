import { z } from "zod";
import { createProductDto } from "../../../../shared/interfaces";

export type CreateProductDto = z.infer<typeof createProductDto>;
