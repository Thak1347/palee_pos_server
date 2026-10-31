import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUser } from "../@types/user.type";

export const UserController = {
    createUserController: async(req: Request, res: Response) => {
       const user:CreateUser =req.body;
       try {
          const result = await UserService.createUserService(user)
          res.status(201).json({
             success: true,
             message: "Added user",
             data: result
          })
       } catch (error: any) {
          console.error(error);
          res.status(500).json({
             success: false,
             message: "Server error",
          })
       }
    },
    findAllUserController: async(req: Request, res: Response) => {
       try {
         const result = await UserService.findAllUserService();
         res.status(200).json({
            success: true,
            message: "Fetching data success",
            data: result
         })
       } catch (error) {
         console.error(error);
         res.status(500).json({
            success: false,
            message: "Server error"
         })
       }
    }
}