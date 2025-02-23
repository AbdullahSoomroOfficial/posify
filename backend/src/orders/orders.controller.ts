import { Request, Response } from "express-serve-static-core";

export const orderController = {
  createOrder: async (request: Request, response: Response) => {
    const data = request.body as CreateSaleDto;
    /**
     * Check if stock exists for the given product(productId)
     */
    const stocks: IStock[] = await stockService.getStocks({
      productId: data.productId,
    });
    if (!stocks.length) {
      response.status(404).json(createResponse(null, "Stock not available"));
      return;
    }
    /**
     * Procut should be able to sell only if there is enough stock quantity
     */
    if (stocks[0].quantity < data.quantity) {
      response
        .status(400)
        .json(createResponse(null, "Not enough stock to create sale"));
      return;
    }
    /**
     * Create sale
     */
    const sale = {
      productId: new Types.ObjectId(data.productId),
      pricePerUnit: (stocks[0].productId as IProduct).price,
      totalAmount: (stocks[0].productId as IProduct).price * data.quantity,
      quantity: data.quantity,
    };
    const newSale = await saleService.createSale(sale);
    /**
     * Update stock quantity after sale
     */
    await stockService.updateStockById(new Types.ObjectId(stocks[0]._id), {
      quantity: stocks[0].quantity - data.quantity,
    });
    response.status(201).json(createResponse(newSale));
  },

  getOrders: async (request: Request, response: Response) => {
    const stocks = await saleService.getSales();
    response.status(200).json(createResponse(stocks));
  },

  getOrderById: async (request: Request, response: Response) => {
    const { id } = request.params;
    const stock = await saleService.getSaleById(new Types.ObjectId(id));
    if (stock) {
      response.status(200).json(createResponse(stock));
    } else {
      response.status(404).json(createResponse(null, "Sale not found"));
    }
  },

  updateOrderById: async (request: Request, response: Response) => {
    const { id } = request.params;
    const data = request.body as UpdateSaleDto;
    /**
     * Check if stock exists for the given product(productId)
     */
    const sale = await saleService.getSaleById(new Types.ObjectId(id));
    if (!sale) {
      response.status(404).json(createResponse(null, "Sale not found"));
      return;
    }
    const stocks: IStock[] = await stockService.getStocks({
      productId: sale.productId,
    });
    if (!stocks.length) {
      response.status(404).json(createResponse(null, "Stock not available"));
      return;
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
      response
        .status(400)
        .json(createResponse(null, "Not enough stock to create sale"));
      return;
    }
    /**
     * Update sale
     */
    // sale.pricePerUnit * data.quantity reason to multiply with pricePerUnit for the sale itself because product price can be changed if product price is changed then sale price should not be changed
    // Only allowing to update quantity of sale which will update totalAmount of sale but for with the same pricePerUnit of product which was at the time of sale creation
    sale.totalAmount = sale.pricePerUnit * data.quantity;
    sale.quantity = data.quantity;

    const updatedSale = await sale.save();
    if (!updatedSale) {
      response.status(404).json(createResponse(null, "Sale not found"));
    }
    /**
     * Update stock quantity after sale
     */
    await stockService.updateStockById(new Types.ObjectId(stock._id), {
      // If sale decrease stock increase if sale increase stock decrease.
      // If quantityDifference is in negative then it will increase the stock quantity.
      // Otherwise it will decrease the stock quantity
      quantity: stock.quantity - quantityDifference,
    });
    response.status(200).json(createResponse(updatedSale));
  },

  deleteOrderById: async (request: Request, response: Response) => {
    const { id } = request.params;
    const deletedSale = await saleService.deleteSaleById(
      new Types.ObjectId(id)
    );
    if (deletedSale) {
      response.status(204).send();
    } else {
      response.status(404).json(createResponse(null, "Sale not found"));
    }
  },
};
