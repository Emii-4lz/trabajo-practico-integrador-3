import { Router } from 'express';
import { updateProfileValidation } from '../middlewares/validations/user.validation.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const userRouter = Router();

userRouter.get('/', authMiddleware, adminMiddleware, getAllUsers);
userRouter.get('/:id', authMiddleware, adminMiddleware, getUserById);
userRouter.put('/:id', authMiddleware, adminMiddleware, updateProfileValidation, validateRequest, updateUser);
userRouter.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

export default userRouter;