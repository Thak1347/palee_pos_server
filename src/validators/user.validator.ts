import { Request, Response, NextFunction } from "express";
import { CreateUser } from "../@types/user.type";
export const UserValidator = {
   creatUserValidator: (req: Request, res: Response, next: NextFunction) => {
         const user:CreateUser = req.body;
         if(!user.name){
           return res.status(409).json({
              success: false,
              message: "name not found"
           })
         }
         next();
   }
};