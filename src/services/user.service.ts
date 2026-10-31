import { prisma } from "../config/prisma";
import { CreateUser } from "../@types/user.type";
import bcrypt from "bcrypt";

export const UserService = {
    createUserService: async (user: CreateUser) =>
        prisma.user.create({
            data: {
                ...user,
                password: await bcrypt.hash(user.password, 10)
            }
     }),
     findAllUserService: async () => prisma.user.findMany(),
     findUserByIdService: async(id: number) => prisma.user.findUnique({where: {userId: id}}),
};
