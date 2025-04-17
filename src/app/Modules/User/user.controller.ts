import { Request, Response } from "express";
import { createUserSchema } from "./user.validation";
import {  userService } from "./user.service";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const result = await userService.createUser(userData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const userController = {
  createUser,
};
