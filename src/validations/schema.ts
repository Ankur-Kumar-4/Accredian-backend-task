import { z } from 'zod';

export const userRegistrationSchema = {
  body: z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    phone: z.string().optional(),
  })
};

export const userLoginSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  })
};

export const referralCreationSchema = {
  body: z.object({
    referredName: z.string().min(2).max(50),
    referredEmail: z.string().email(),
    referredPhone: z.string().optional(),
    message: z.string().max(500).optional(),
  })
};

