import { NextFunction, Request, Response } from "express-serve-static-core";
import { createResponse } from "../utils/response.util";
import { stockService } from "./stock.service";
import { productService } from "../product/product.service";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { NotFoundError } from "../utils/error.util";

export const stockController = {
  createStock: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = request.body as CreateStockDto;
      /**
       * Check if the product exists for given product id
       */
      const product = await productService.getProductById(data.productId);
      if (!product) {
        throw new NotFoundError("Product not found");
      }
      const newStock = await stockService.createStock(data);
      response
        .status(201)
        .json(
          createResponse(
            true,
            newStock,
            "Stock created successfully",
            null,
            null,
            null
          )
        );
    } catch (error) {
      next(error);
    }
  },

  getStocks: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const query = request.query;
      const stocks = await stockService.getStocks(query);
      response
        .status(200)
        .json(
          createResponse(
            true,
            stocks,
            "Stocks fetched successfully",
            null,
            null,
            null
          )
        );
    } catch (error) {
      next(error);
    }
  },

  getStockById: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const stock = await stockService.getStockById(id);
      if (stock) {
        response
          .status(200)
          .json(createResponse(true, stock, null, null, null, null));
      } else {
        throw new NotFoundError("Stock not found");
      }
    } catch (error) {
      next(error);
    }
  },

  updateStockById: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const data = request.body as UpdateStockDto;
      const updatedStock = await stockService.updateStockById(id, data);
      if (updatedStock) {
        response
          .status(200)
          .json(
            createResponse(
              true,
              updatedStock,
              "Stock updated successfully",
              null,
              null,
              null
            )
          );
      } else {
        throw new NotFoundError("Stock not found");
      }
    } catch (error) {
      next(error);
    }
  },

  deleteStockById: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const deletedStock = await stockService.deleteStockById(id);
      if (deletedStock) {
        response
          .status(204)
          .json(createResponse(true, deletedStock, null, null, null, null));
      } else {
        throw new NotFoundError("Stock not found");
      }
    } catch (error) {
      next(error);
    }
  },
};
