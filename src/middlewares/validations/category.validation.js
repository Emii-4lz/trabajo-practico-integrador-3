import { body } from 'express-validator';

export const createCategoryValidation = [
    body('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio.')
        .isLength({ min: 2, max: 20 })
        .withMessage('El nombre debe tener entre 2 y 20 caracteres.')
        .isString(),

    body('description')
        .optional()
        .isLength({ max: 200 })
        .withMessage('La descripción no debe exceder los 200 caracteres.')
        .isString(),
];

export const updateCategoryValidation = [
    body('name')
        .optional()
        .isLength({ min: 2, max: 20 })
        .withMessage('El nombre debe tener entre 2 y 20 caracteres.')
        .isString(),

    body('description')
        .optional()
        .isLength({ max: 200 })
        .withMessage('La descripción no debe exceder los 200 caracteres.')
        .isString(),
];