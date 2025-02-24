import { Order } from "./order.model";
import { Order as IOrder } from "../../../shared/interfaces";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { stockService } from "../stock/stock.service";
import { BadRequestError, NotFoundError } from "../utils/error.util";
import { Product as IProduct } from "../../../shared/interfaces";

export const orderService = {
  createOrder: async (data: CreateOrderDto): Promise<IOrder> => {
    // Gather unique productIds from the order items.
    const productIds = Array.from(
      new Set(data.items.map((item) => item.productId))
    );

    // Fetch stocks and product details for all unique product IDs.
    const stocks = await stockService.getStocks({
      productId: { $in: productIds },
    });

    // Validate that each order item has sufficient stock.
    const validationErrors: string[] = [];
    data.items.forEach((item) => {
      const stock = stocks.find((s) => s.productId === item.productId);
      if (!stock) {
        validationErrors.push(`Stock for product ${item.productId} not found`);
      } else if (stock.quantity < item.quantity) {
        validationErrors.push(
          `Insufficient stock for product ${item.productId}`
        );
      }
    });

    // If any validation errors exist, throw a combined BadRequestError.
    if (validationErrors.length > 0) {
      throw new BadRequestError(JSON.stringify(validationErrors));
    }

    // Prepare bulk update operations to decrement stock quantities.
    const stocksToUpdate = data.items.map((item) => ({
      productId: item.productId,
      quantity: -item.quantity, // Negative value for decrementing stock
    }));

    // Update stock quantities.
    await stockService.updateStocksQuantityByProductId(stocksToUpdate);

    const products = stocks.map(
      (stock) => stock.productId as unknown as IProduct
    );

    // Create and save the new order with fetched product details.
    let subTotal = 0;
    let discount = data.discount;
    let newOrderData = {
      items: data.items.map((item) => {
        const product = products.find((p) => p._id === item.productId);
        const lineTotal = product!.price * item.quantity; // Calculate line total
        subTotal += lineTotal; // Accumulate subTotal
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product!.price,
          lineTotal,
        };
      }),
      subTotal: subTotal,
      discount: discount,
      totalAmount: subTotal * (1 - discount / 100),
    };
    const newOrder = new Order(newOrderData);

    return await newOrder.save();
  },

  getOrders: async (query: object): Promise<IOrder[]> => {
    return await Order.find(query);
  },

  getOrderById: async (id: string): Promise<IOrder | null> => {
    return await Order.findById(id);
  },

  updateOrderById: async (
    id: string,
    data: UpdateOrderDto
  ): Promise<IOrder | null> => {
    // Fetch the existing order.
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      throw new NotFoundError("Order not found");
    }

    // Build maps for old and new quantities per productId.
    const oldQuantities = new Map<string, number>();
    existingOrder.items.forEach((item) => {
      oldQuantities.set(
        item.productId,
        (oldQuantities.get(item.productId) || 0) + item.quantity
      );
    });

    const newQuantities = new Map<string, number>();
    data.items.forEach((item) => {
      newQuantities.set(
        item.productId,
        (newQuantities.get(item.productId) || 0) + item.quantity
      );
    });

    // Create a set of all productIds present in either old or new order.
    const productIds = Array.from(
      new Set([...oldQuantities.keys(), ...newQuantities.keys()])
    );

    // Fetch stocks for all involved product IDs.
    const stocks = await stockService.getStocks({
      productId: { $in: productIds },
    });

    // Validate each product's stock when new quantity is greater than the old.
    const validationErrors: string[] = [];
    productIds.forEach((productId) => {
      const oldQuantity = oldQuantities.get(productId) || 0;
      const newQuantity = newQuantities.get(productId) || 0;
      const delta = newQuantity - oldQuantity;
      if (delta > 0) {
        const stock = stocks.find((s) => s.productId === productId);
        if (!stock) {
          validationErrors.push(`Stock for product ${productId} not found`);
        } else if (stock.quantity < delta) {
          validationErrors.push(`Insufficient stock for product ${productId}`);
        }
      }
    });

    if (validationErrors.length > 0) {
      throw new BadRequestError(JSON.stringify(validationErrors));
    }

    // Prepare bulk updates for stocks.
    // For each product, the change to the stock should be the negative delta.
    // When delta is positive (new > old), stock must be decremented.
    // When delta is negative (old > new), stock will be incremented.
    const stocksToUpdate = productIds.map((productId) => {
      const oldQuantity = oldQuantities.get(productId) || 0;
      const newQuantity = newQuantities.get(productId) || 0;
      const delta = newQuantity - oldQuantity;
      return {
        productId,
        quantity: -delta, // subtract if delta > 0; add back if delta < 0
      };
    });

    // Update the stocks in bulk.
    await stockService.updateStocksQuantityByProductId(stocksToUpdate);

    const products = stocks.map(
      (stock) => stock.productId as unknown as IProduct
    );

    let subTotal = 0;
    let discount = data.discount;
    let updatedOrderData = {
      items: data.items.map((item) => {
        const product = products.find((p) => p._id === item.productId);
        const lineTotal = product!.price * item.quantity; // Calculate line total
        subTotal += lineTotal; // Accumulate subTotal
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product!.price,
          lineTotal,
        };
      }),
      subTotal: subTotal,
      discount: discount,
      totalAmount: subTotal * (1 - discount / 100),
    };

    // Update the order with new data.
    const updatedOrder = await Order.findByIdAndUpdate(id, updatedOrderData, {
      new: true,
    });
    return updatedOrder;
  },

  /* 
    When user delete order, stock quantity will be updated by adding the quantity back exist in the order 
    for each product.
  */
  deleteOrderById: async (id: string): Promise<IOrder | null> => {
    const order = await Order.findByIdAndDelete(id);
    if (order) {
      const stocksToUpdate = order.items.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity, // Add the quantity back to stock
        };
      });

      await stockService.updateStocksQuantityByProductId(stocksToUpdate);
    }
    return order;
  },

  /* When product get deleted all of its linked order get deleted */
  deleteOrdersByProductId: async (productId: string): Promise<any> => {
    return await Order.deleteMany({ productId });
  },
};
