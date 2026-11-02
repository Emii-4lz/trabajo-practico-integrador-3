import { Router } from 'express';
import { createEvent, updateEvent, getAllEvents, getEventById, deleteEvent } from '../controllers/event.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { adminOrOwnerMiddleware } from '../middlewares/admin.or.owner.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';
import { createEventValidation, updateEventValidation } from '../middlewares/validations/event.validation.js';

const eventRouter = Router();

eventRouter.get('/', getAllEvents);
eventRouter.get('/:id', getEventById);
eventRouter.post('/', authMiddleware, adminMiddleware, createEventValidation, validateRequest, createEvent);
eventRouter.put('/:id', authMiddleware, adminOrOwnerMiddleware, updateEventValidation, validateRequest, updateEvent);
eventRouter.delete('/:id', authMiddleware, adminMiddleware, deleteEvent);

export default eventRouter;