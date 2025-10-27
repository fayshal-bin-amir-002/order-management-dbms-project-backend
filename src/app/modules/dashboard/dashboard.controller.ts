import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AdminDashboardService } from "./dashboard.service";

const getAdminDashboardData = catchAsync(async (req, res) => {
  const result = await AdminDashboardService.getAdminDashboardData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin dashboard data retrived successfully",
    data: result,
  });
});

export const AdminDashboardController = {
  getAdminDashboardData,
};
