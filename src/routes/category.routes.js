import { Router } from 'express';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js';
import { createCategoryValidation, updateCategoryValidation } from '../middlewares/validations/category.validation.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { adminOrOwnerMiddleware } from '../middlewares/admin.or.owner.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.post('/', authMiddleware, adminMiddleware, createCategoryValidation, validateRequest, createCategory);
categoryRouter.put('/:id', authMiddleware, adminMiddleware, updateCategoryValidation, validateRequest, updateCategory);
categoryRouter.delete('/:id', authMiddleware, adminMiddleware, deleteCategory);

export default categoryRouter;