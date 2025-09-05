import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import {
  CustomerModel,
  ICustomer,
  Role,
  Membership,
} from "./customer.interface";

const customerSchema = new Schema<ICustomer, CustomerModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    membership: {
      type: String,
      enum: Object.values(Membership),
      default: Membership.BRONZE,
    },
  },
  { timestamps: true }
);

customerSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

customerSchema.statics.isCustomerExists = async function (email: string) {
  const customer = await this.findOne({ email }).select("+password");
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found!");
  }
  return customer;
};

customerSchema.statics.isCustomerExistsById = async function (id: string) {
  const customer = await this.findById(id);
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found!");
  }
  return customer;
};

customerSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  const isMatched = await bcrypt.compare(plainTextPassword, hashedPassword);
  if (!isMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password!");
  }
  return true;
};

const Customer = model<ICustomer, CustomerModel>("Customer", customerSchema);

export default Customer;
