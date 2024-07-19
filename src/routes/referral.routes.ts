import router, { Router } from 'express';
import referralController from '../controllers/referral.controller';
import authMiddleware from '../middleware/auth';
import validateRequest from '../middleware/validateRequest';
import { referralCreationSchema } from '../validations/schema';

const referralRouter: Router = router();

referralRouter.post('/', authMiddleware, validateRequest(referralCreationSchema),referralController.createReferral);
referralRouter.get('/', authMiddleware, referralController.getUserReferrals);

export default referralRouter;