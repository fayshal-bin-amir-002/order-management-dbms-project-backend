import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "../modules/customer/customer.interface";

export interface IJwtPayload {
  email: string;
  id: string;
  role: Role;
}

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: string | any
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
