import { Order } from "./order.model";
import { Order as IOrder } from "../../../shared/interfaces";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

export const orderService = {
  createOrder: async (data: CreateOrderDto): Promise<IOrder> => {
    const newSale = new Order(data);
    return await newSale.save();
  },

  getOrders: async (): Promise<IOrder[]> => {
    return await Order.find();
  },

  getOrderById: async (id: string): Promise<IOrder | null> => {
    return await Order.findById(id);
  },

  updateOrderById: async (
    id: string,
    data: UpdateOrderDto
  ): Promise<IOrder | null> => {
    return await Order.findByIdAndUpdate(id, data, { new: true });
  },

  deleteOrderById: async (id: string): Promise<IOrder | null> => {
    return await Order.findByIdAndDelete(id);
  },
};
