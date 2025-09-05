import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { customerCreateValidation } from "./customer.validation";
import { CustomerController } from "./customer.controller";
import auth from "../../middleware/auth";
import { Role } from "./customer.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(customerCreateValidation),
  CustomerController.registerCustomer
);

router.get("/", auth(Role.ADMIN), CustomerController.getAllCustomers);

export const CustomerRoutes = router;
