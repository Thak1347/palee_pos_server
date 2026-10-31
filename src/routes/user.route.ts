import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../utils/jwt";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.post("/user",verifyToken,UserValidator.creatUserValidator, UserController.createUserController);
router.get("/user",verifyToken, UserController.findAllUserController);

export default router;