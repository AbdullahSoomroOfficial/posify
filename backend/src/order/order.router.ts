import express from "express";
import { orderController } from "./order.controller";
import { validate } from "../utils/validate.util";
import { createOrderDto } from "../../../shared/dto";
import { updateOrderDto } from "../../../shared/dto";

const orderRouter = express.Router();

/* POST - /order */
orderRouter.post("/", validate(createOrderDto), orderController.createOrder);

/* GET - /order */
orderRouter.get("/", orderController.getOrders);

/* GET - /order/{id} */
orderRouter.get("/:id", orderController.getOrderById);

/* PUT - /order/{id} */
orderRouter.put(
  "/:id",
  validate(updateOrderDto),
  orderController.updateOrderById
);

/* DELETE - /order/{id} */
orderRouter.delete("/:id", orderController.deleteOrderById);

export { orderRouter };
