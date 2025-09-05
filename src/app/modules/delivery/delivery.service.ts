import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { Delivery } from "./delivery.model";
import { IDelivery } from "./delivery.interface";

const updateDelivery = async (
  deliveryId: string,
  updateData: { shipping_method: string }
): Promise<IDelivery> => {
  const updatedDelivery = await Delivery.findByIdAndUpdate(
    deliveryId,
    {
      $set: {
        shipping_method: updateData.shipping_method,
        delivered: true,
        date: new Date(),
      },
    },
    { new: true, runValidators: true }
  );

  if (!updatedDelivery) {
    throw new AppError(httpStatus.NOT_FOUND, "Delivery not found");
  }

  return updatedDelivery;
};

export const DeliveryService = {
  updateDelivery,
};
