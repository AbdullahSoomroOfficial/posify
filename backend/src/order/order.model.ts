import { model, Schema } from "mongoose";
import { Order as IOrder } from "../../../shared/interfaces";

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    price: { type: Number, required: true }, // Keeps a snapshot of product price
    quantity: { type: Number, required: true },
    lineTotal: { type: Number, required: true }, // quantity * price
  },
  { _id: false }
);

export const orderSchema = new Schema<IOrder>(
  {
    items: [orderItemSchema],
    subTotal: { type: Number, required: true }, // Sum of all line totals
    discount: { type: Number, required: true },
    totalAmount: { type: Number, required: true }, // Subtotal + discount
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Order = model<IOrder>("Order", orderSchema);
