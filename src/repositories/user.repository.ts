import { Prisma } from '@prisma/client';
import {prisma} from '../config/prisma';

const createUser = async (userData: Prisma.UserCreateInput) => {
  return prisma.user.create({ data: userData });
};

const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export default {
  createUser,
  findUserByEmail,
};