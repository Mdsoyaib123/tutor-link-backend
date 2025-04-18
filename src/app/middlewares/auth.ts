import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { UserRole } from "../type/user.type";
import catchAsync from "../utilis/catchAsync";
import Config from "../Config";
import { User } from "../modules/User/user.model";

const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("You are not authorized!");
    }

      const decoded = jwt.verify(
        token,
        Config.jwt_secret as string
      ) as JwtPayload;

      const { role, email } = decoded;

      const user = await User.findOne({ email, role });

      if (!user) {
        throw new Error("This user is not found!");
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new Error("You are not authorized!");
      }

      req.user = decoded as JwtPayload & { role: string };
      next();
    
  });
};

export default auth;




