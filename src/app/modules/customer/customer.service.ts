import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { createToken, IJwtPayload } from "../../utils/token.utils";
import config from "../../config";
import QueryBuilder from "../../builder/QueryBuilder";
import { ICustomer, Role } from "./customer.interface";
import Customer from "./customer.model";

const registerCustomer = async (payload: ICustomer) => {
  if ([Role.ADMIN].includes(payload?.role)) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Invalid user info!");
  }

  const isExists = await Customer.findOne({ email: payload?.email });

  if (isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email already registered");
  }

  const customer = await Customer.create(payload);

  const { email, role, _id } = customer;

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

const getAllCustomers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Customer.find(), query)
    .search(["email", "name"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return { result, meta };
};

export const CustomerService = {
  registerCustomer,
  getAllCustomers,
};
