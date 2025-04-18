import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validation";

const router = express.Router();

router.post("/createUser",validateRequest(userValidationSchema.createUserSchema), userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
