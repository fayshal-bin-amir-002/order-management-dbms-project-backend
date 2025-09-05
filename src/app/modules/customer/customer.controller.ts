import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IJwtPayload } from "../../utils/token.utils";
import httpStatus from "http-status";
import { CustomerService } from "./customer.service";

const registerCustomer = catchAsync(async (req, res) => {
  const result = await CustomerService.registerCustomer(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Customer registration completed successfully!",
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req, res) => {
  const { result, meta } = await CustomerService.getAllCustomers(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customers retrieved successfully",
    data: result,
    meta: meta,
  });
});

export const CustomerController = {
  registerCustomer,
  getAllCustomers,
};
