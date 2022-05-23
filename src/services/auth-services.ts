import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createPasswordHash = (password: string) => {
  return bcrypt.hash(password, 11);
};

const checkPassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

const createAuthToken = (id: any, name: any, role: any, email: any) => {
  return jwt.sign(
    {
      id,
      name,
      role,
      email,
    },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

export { createPasswordHash, checkPassword, createAuthToken };
