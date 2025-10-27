import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../customer/customer.interface";
import { AdminDashboardController } from "./dashboard.controller";

const router = Router();

router.get(
  "/",
  auth(Role.ADMIN),
  AdminDashboardController.getAdminDashboardData
);

export const AdminDashboardRoutes = router;
