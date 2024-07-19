export interface Referral {
    id: number;
    referrerId: number;
    referredName: string;
    referredEmail: string;
    referredPhone?: string;
    message?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    referralCode: string;
  }