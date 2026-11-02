import { Router } from 'express';
import { register, login, getProfile, logout, updateProfile } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { registerUserValidation, loginUserValidation, updateProfileValidation } from '../middlewares/validations/user.validation.js';
import { validateRequest } from '../middlewares/validate.middleware.js';

const authRouter = Router();

authRouter.post('/register', registerUserValidation, validateRequest, register);
authRouter.post('/login', loginUserValidation, validateRequest, login);
authRouter.get('/profile', authMiddleware, getProfile);
authRouter.post('/logout', authMiddleware, logout);
authRouter.put('/profile', authMiddleware, updateProfileValidation, validateRequest, updateProfile);

export default authRouter;