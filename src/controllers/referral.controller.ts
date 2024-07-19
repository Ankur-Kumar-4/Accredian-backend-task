import { Request, Response } from 'express';
import referralService from '../services/referral.service';

interface AuthRequest extends Request {
    user?: { userId: number; email: string };
  }
const createReferral = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      const referralData = { ...req.body, referrerId: req.user.userId };
      const referral = await referralService.createReferral(referralData);
      res.status(201).json({ referral })
  } catch (error) {
    res.status(400).json({ error: 'Referral creation failed' });
  }
};

const getUserReferrals = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
    const userId = req.user.userId;
    const referrals = await referralService.getUserReferrals(userId);
    res.json({ referrals });
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch referrals' });
  }
};

export default {
  createReferral,
  getUserReferrals,
};