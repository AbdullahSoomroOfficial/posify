import { NextFunction, Request, Response } from "express-serve-static-core";
import { createResponse } from "../utils/response.util";
import { orderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { NotFoundError } from "src/utils/error.util";

export const orderController = {
  createOrder: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = request.body as CreateOrderDto;
      const newOrder = await orderService.createOrder(data);
      response
        .status(201)
        .json(
          createResponse(
            true,
            newOrder,
            "Order created successfully",
            null,
            null,
            null
          )
        );
    } catch (error) {
      next(error);
    }
  },

  getOrders: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const query = request.query;
      const stocks = await orderService.getOrders(query);
      response
        .status(200)
        .json(createResponse(true, stocks, null, null, null, null));
    } catch (error) {
      next(error);
    }
  },

  getOrderById: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const stock = await orderService.getOrderById(id);
      if (stock) {
        response
          .status(200)
          .json(createResponse(true, stock, null, null, null, null));
      } else {
        throw new NotFoundError("Order not found");
      }
    } catch (error) {
      next(error);
    }
  },

  updateOrderById: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const data = request.body as UpdateOrderDto;
      const updatedOrder = await orderService.updateOrderById(id, data);
      response
        .status(200)
        .json(
          createResponse(
            true,
            updatedOrder,
            "Order updated successfully",
            null,
            null,
            null
          )
        );
    } catch (error) {
      next(error);
    }
  },

  deleteOrderById: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const deletedSale = await orderService.deleteOrderById(id);
      if (deletedSale) {
        response.status(204).send();
      } else {
        throw new NotFoundError("Order not found");
      }
    } catch (error) {
      next(error);
    }
  },
};
