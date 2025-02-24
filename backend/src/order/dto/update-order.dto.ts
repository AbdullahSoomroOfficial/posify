import { z } from "zod";
import { updateOrderDto } from "../../../../shared/interfaces";

export type UpdateOrderDto = z.infer<typeof updateOrderDto>;
