import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { DeliveryService } from "./delivery.service";

const updateDelivery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DeliveryService.updateDelivery(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delivery updated successfully",
    data: result,
  });
});

export const DeliveryController = {
  updateDelivery,
};
