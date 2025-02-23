import { NextFunction, Request, Response } from "express-serve-static-core";
import { createResponse } from "../utils/response.util";
import { orderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { stockService } from "src/stock/stock.service";
import { BadRequestError, NotFoundError } from "src/utils/error.util";

export const orderController = {
  createOrder: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = request.body as CreateOrderDto;
      /**
       * Create order
       */
      const newOrder = await orderService.createOrder(data);
      /**
       * Update stock quantity after order
       */
      await stockService.updateStockById(stocks[0]._id, {
        quantity: stocks[0].quantity - data.quantity,
      });
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

  getOrders: async (_: Request, response: Response, next: NextFunction) => {
    try {
      const stocks = await orderService.getOrders();
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
      /**
       * Check if stock exists for the given product(productId)
       */
      const sale = await orderService.getOrderById(id);
      if (!sale) {
        throw new NotFoundError("Stock not available");
      }
      const stocks = await stockService.getStocks({
        productId: sale.productId,
      });
      if (!stocks.length) {
        throw new NotFoundError("Stock not available");
      }
      const stock = stocks[0];
      // Calculate the quantity difference
      const quantityDifference = data.quantity - sale.quantity;
      console.log("quantityDifference", quantityDifference);
      console.log("data.quantity", data.quantity);
      console.log("sale.quantity", sale.quantity);
      console.log("stock.quantity", stock.quantity);
      /**
       * Procut should be able to sell only if there is enough stock quantity
       */
      // If quantityDifference is in positive then difference should not exceed the stock quantity
      if (quantityDifference > 0 && quantityDifference > stock.quantity) {
        throw new BadRequestError("Not enough stock to create order");
      }
      /**
       * Update sale
       */
      // sale.pricePerUnit * data.quantity reason to multiply with pricePerUnit for the sale itself because product price can be changed if product price is changed then sale price should not be changed
      // Only allowing to update quantity of sale which will update totalAmount of sale but for with the same pricePerUnit of product which was at the time of sale creation
      sale.totalAmount = sale.pricePerUnit * data.quantity;
      sale.quantity = data.quantity;

      const updatedOrder = await sale.save();
      if (!updatedOrder) {
        throw new NotFoundError("Order not found");
      }
      /**
       * Update stock quantity after sale
       */
      await stockService.updateStockById(stock._id, {
        // If sale decrease stock increase if sale increase stock decrease.
        // If quantityDifference is in negative then it will increase the stock quantity.
        // Otherwise it will decrease the stock quantity
        quantity: stock.quantity - quantityDifference,
      });
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
