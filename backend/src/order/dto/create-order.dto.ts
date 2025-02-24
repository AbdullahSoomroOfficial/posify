import { z } from "zod";
import { createOrderDto } from "../../../../shared/interfaces";

export type CreateOrderDto = z.infer<typeof createOrderDto>;
