import { Prisma, Referral } from '@prisma/client';
import {prisma} from '../config/prisma';

const createReferral = async (referralData:Omit<Referral, 'id'> )=> {
  return prisma.referral.create({ data: referralData });
};

const findReferralsByUserId = async (userId: number) => {
  return prisma.referral.findMany({ where: { referrerId: userId } });
};

export default {
  createReferral,
  findReferralsByUserId,
};