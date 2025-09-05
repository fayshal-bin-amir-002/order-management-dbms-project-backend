import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { DeliveryController } from "./delivery.controller";
import { deliveryUpdateValidation } from "./delivery.validation";
import { Role } from "../customer/customer.interface";

const router = Router();

router.patch(
  "/:id",
  auth(Role.ADMIN),
  validateRequest(deliveryUpdateValidation),
  DeliveryController.updateDelivery
);

export const DeliveryRoutes = router;
