import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { OrderController } from "./order.controller";
import {
  orderCreateValidation,
  orderUpdateStatusValidation,
  orderUpdateItemValidation,
} from "./order.validation";
import { Role } from "../customer/customer.interface";

const router = Router();

router.post(
  "/",
  auth(Role.USER, Role.ADMIN),
  validateRequest(orderCreateValidation),
  OrderController.createOrder
);

router.get("/", auth(Role.ADMIN), OrderController.getAllOrders);

router.get("/:id", auth(Role.ADMIN, Role.USER), OrderController.getOrderById);

router.get(
  "/customer/:customerId",
  auth(Role.ADMIN, Role.USER),
  OrderController.getOrdersByCustomer
);

router.patch(
  "/:id/status",
  auth(Role.ADMIN),
  validateRequest(orderUpdateStatusValidation),
  OrderController.updateOrderStatus
);

router.delete("/:id", auth(Role.ADMIN), OrderController.deleteOrder);

export const OrderRoutes = router;
