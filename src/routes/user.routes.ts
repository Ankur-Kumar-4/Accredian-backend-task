import router, { Router } from 'express';
import userController from '../controllers/user.controller';
import { userLoginSchema, userRegistrationSchema } from '../validations/schema';
import validateRequest from '../middleware/validateRequest';

const userRouter: Router = router();

userRouter.post('/register', validateRequest(userRegistrationSchema), userController.register);
userRouter.post('/login', validateRequest(userLoginSchema), userController.login);

export default userRouter;