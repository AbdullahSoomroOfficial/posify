import express from "express";
import { orderController } from "./order.controller";
import { validate } from "../utils/validate.util";
import { createOrderDto } from "./dto/create-order.dto";
import { updateOrderDto } from "./dto/update-order.dto";

const orderRouter = express.Router();

// POST - /api/orders
orderRouter.post("/", validate(createOrderDto), orderController.createOrder);

// GET - /api/orders
orderRouter.get("/", orderController.getOrders);

// GET - /api/orders/:id
orderRouter.get("/:id", orderController.getOrderById);

// PUT - /api/orders/:id
orderRouter.put(
  "/:id",
  validate(updateOrderDto),
  orderController.updateOrderById
);

// DELETE - /api/orders/:id
orderRouter.delete("/:id", orderController.deleteOrderById);

export { orderRouter };
