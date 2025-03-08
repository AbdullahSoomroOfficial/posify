import express from "express";
import { orderController } from "./order.controller";
import { validate } from "../utils/validate.util";
import { createOrderDto } from "../../../shared/dto";
import { updateOrderDto } from "../../../shared/dto";

const orderRouter = express.Router();

/* POST - /api/order */
orderRouter.post("/", validate(createOrderDto), orderController.createOrder);

/* GET - /api/order */
orderRouter.get("/", orderController.getOrders);

/* GET - /api/order/{id} */
orderRouter.get("/:id", orderController.getOrderById);

/* PUT - /api/order/{id} */
orderRouter.put(
  "/:id",
  validate(updateOrderDto),
  orderController.updateOrderById
);

/* DELETE - /api/order/{id} */
orderRouter.delete("/:id", orderController.deleteOrderById);

export { orderRouter };
