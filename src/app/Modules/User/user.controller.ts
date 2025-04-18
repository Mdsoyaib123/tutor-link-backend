import { Request, Response } from "express";
import { createUserSchema } from "./user.validation";
import { userService } from "./user.service";
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
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All user get successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.getSingleUser(id);
  if (!result) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "single user get successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.updateUser(id, req.body);
  if (!result) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " user updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.deleteUser(id);

  if (!result) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " user deleted successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
