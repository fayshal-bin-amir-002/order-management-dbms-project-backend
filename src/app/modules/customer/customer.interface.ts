import { Document, Model, Types } from "mongoose";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export enum Membership {
  GOLD = "gold",
  SILVER = "silver",
  BRONZE = "bronze",
}

export interface ICustomer extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  membership: Membership;
}

export interface CustomerModel extends Model<ICustomer> {
  isCustomerExists(email: string): Promise<ICustomer>;
  isCustomerExistsById(id: string | Types.ObjectId): Promise<ICustomer>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
