import jwt from "jsonwebtoken";

import { AuthRole, IAuthPayload } from "../services/types";

// authentication
export const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    // get the token
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw "Access denieded, Please log in!";

    // verify token
    const decoded: any = jwt.verify(token, `${process.env.JWT_SECRET}`);

    const auth = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    req.me = auth;

    return next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: "Access denieded, Please log in!",
    });
  }
};

// validate role
export const authRoleMiddleware = async (
  req: any,
  res: any,
  next: any,
  expectedRole: string,
) => {
  try {
    let authBody: IAuthPayload = req.me;

    if (expectedRole == AuthRole.TIKKA && authBody.role == AuthRole.TIKKA) {
      return next();
    } else if (
      expectedRole == AuthRole.FRONT_DESK &&
      authBody.role == AuthRole.FRONT_DESK
    ) {
      return next();
    } else {
      throw "Permission denied";
    }
  } catch (err) {
    res.status(401).send({ status: "access denied" });
  }
};
