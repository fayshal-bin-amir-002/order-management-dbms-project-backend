import { z } from "zod";
import mongoose from "mongoose";

export const deliveryUpdateValidation = z.object({
  body: z.object({
    delivered: z.boolean().optional().default(true),
    date: z
      .string()
      .datetime()
      .optional()
      .default(() => new Date().toISOString()),
    shipping_method: z.string({
      required_error: "Shipping method is required",
    }),
  }),
});
