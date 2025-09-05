import { Schema, model } from "mongoose";
import { IDelivery } from "./delivery.interface";

const deliverySchema = new Schema<IDelivery>(
  {
    order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    delivered: { type: Boolean, required: true, default: false },
    date: { type: Date, default: null },
    shipping_method: { type: String, default: null },
  },
  { timestamps: true }
);

export const Delivery = model<IDelivery>("Delivery", deliverySchema);
