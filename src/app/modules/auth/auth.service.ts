import config from "../../config";
import { createToken, IJwtPayload } from "../../utils/token.utils";
import Customer from "../customer/customer.model";
import { IAuth } from "./auth.interface";

const loginUser = async (payload: IAuth) => {
  const user = await Customer.isCustomerExists(payload?.email);
  const { email, role, password, _id } = user;

  await Customer.isPasswordMatched(payload?.password, password);

  const jwtPayload: IJwtPayload = {
    email: email,
    role,
    id: _id as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
};
