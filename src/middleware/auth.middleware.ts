import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your_fallback_secret_key';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn'];

interface LoginRequestBody {
  contact?: string;
  password?: string;
}

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<Response> => {
  try {
    const { contact, password } = req.body;
    if (!contact || !password) {
      return res.status(400).json({
        success: false,
        message: 'ກະລຸນາປ້ອນເບີໂທ (contact) ແລະ ລະຫັດຜ່ານ (password)',
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        contact: contact,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'ເບີໂທ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'ເບີໂທ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
      });
    }
    const tokenPayload = {
      userId: user.userId,
      name: user.name,
      lastname: user.lastname,
      gender: user.gender,
      email: user.email,
      contact: user.contact,
    };

    const signOptions: SignOptions = {
      expiresIn: JWT_EXPIRES_IN,
    };
    const token = jwt.sign(tokenPayload, JWT_SECRET, signOptions);
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      message: 'ເຂົ້າສູ່ລະບົບສໍາເລັດ',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'ເກີດຂໍ້ຜິດພາດໃນລະບົບ',
    });
  }
};