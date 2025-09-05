import { z } from "zod";
import { Role, Membership } from "./customer.interface";

export const customerCreateValidation = z.object({
  body: z.object({
    name: z.string().trim().min(2, {
      message: "Name must be at least 2 characters long",
    }),
    email: z.string().trim().email({
      message: "A valid email is required",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    role: z.nativeEnum(Role).default(Role.USER),
    membership: z.nativeEnum(Membership).default(Membership.BRONZE),
  }),
});
