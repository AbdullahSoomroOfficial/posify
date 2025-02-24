import { z } from "zod";
import { createStockDto } from "./create-stock.dto";

export const updateStockDto = createStockDto.pick({ quantity: true });

export type UpdateStockDto = z.infer<typeof updateStockDto>;
