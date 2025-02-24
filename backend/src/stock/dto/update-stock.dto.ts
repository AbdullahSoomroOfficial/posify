import { z } from "zod";
import { updateStockDto } from "../../../../shared/interfaces";

export type UpdateStockDto = z.infer<typeof updateStockDto>;
