import { z } from "zod";
import { createStockDto } from "../../../../shared/interfaces";

export type CreateStockDto = z.infer<typeof createStockDto>;
