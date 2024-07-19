import { Referral } from '@prisma/client';
import referralRepository from '../repositories/referral.repository';
import emailService from './email.service';

const createReferral = async (referralData: Omit<Referral, 'id' | 'status' | 'referralCode'>) => {
  const referralCode = generateReferralCode();
  const newReferral= await referralRepository.createReferral({ ...referralData, status: 'PENDING', referralCode });

  try {
    await emailService.sendReferralEmail(newReferral.referredEmail, newReferral.referralCode);
  } catch (error) {
    console.error('Failed to send referral email:', error);
  }
  return newReferral
};

const getUserReferrals = async (userId: number): Promise<Referral[]> => {
  return referralRepository.findReferralsByUserId(userId);
};

const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export default {
  createReferral,
  getUserReferrals,
};