import { z } from "zod";
import { createOrderDto } from "./create-order.dto";

export const updateOrderDto = createOrderDto;

export type UpdateOrderDto = z.infer<typeof updateOrderDto>;
