import { body } from 'express-validator';

export const createEventValidation = [
    body('title')
        .notEmpty()
        .withMessage('El título es obligatorio.')
        .isLength({ min: 3, max: 100 })
        .withMessage('El título debe tener entre 3 y 100 caracteres.')
        .isString(),

    body('description')
        .optional()
        .isLength({ max: 200 })
        .withMessage('La descripción no debe exceder los 200 caracteres.')
        .isString(),

    body('startDate')
        .notEmpty()
        .withMessage('La fecha de inicio es obligatoria')
        .isISO8601()
        .withMessage('La fecha de inicio debe ser una fecha válida.'),

    body('endDate')
        .notEmpty()
        .withMessage('La fecha de fin es obligatoria')
        .isISO8601()
        .withMessage('La fecha de fin debe ser una fecha válida.')
        .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("La fecha de fin es invalida.");
      }
      return true;
    }),

    body('capacity')
        .notEmpty()
        .withMessage('La capacidad es obligatoria.')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser un número entero positivo.'),

    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número decimal no negativo.'),

    body('status')
        .optional()
        .isIn(['scheduled', 'cancelled', 'finished'])
        .withMessage('Ingrese un estado valido.'),

    body('location.venue')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre del lugar debe tener entre 3 y 100 caracteres.')
        .isString(),

    body('location.address')
        .optional()
        .isLength({ min: 5, max: 150 })
        .withMessage('La dirección debe tener entre 5 y 150 caracteres.')
        .isString(),

    body('location.city')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre de la ciudad debe tener entre 2 y 50 caracteres.')
        .isString(),

    body('categories.*')
        .optional()
        .isMongoId()
        .withMessage('Cada categoría debe ser un ID válido de MongoDB.')
];

export const updateEventValidation = [
    body('title')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('El título debe tener entre 3 y 100 caracteres.')
        .isString(),

    body('description')
        .optional()
        .isLength({ max: 200 })
        .withMessage('La descripción no debe exceder los 200 caracteres.')
        .isString(),

    body('startDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha de inicio debe ser una fecha válida.'),

    body('endDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha de fin debe ser una fecha válida.')
        .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("La fecha de fin es invalida.");
      }
      return true;
    }),

    body('capacity')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser un número entero positivo.'),

    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número decimal no negativo.'),

    body('status')
        .optional()
        .isIn(['scheduled', 'cancelled', 'finished'])
        .withMessage('El estado debe ser "scheduled", "cancelled" o "finished"'),

    body('location.venue')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre del lugar debe tener entre 3 y 100 caracteres.')
        .isString(),

    body('location.address')
        .optional()
        .isLength({ min: 5, max: 150 })
        .withMessage('La dirección debe tener entre 5 y 150 caracteres.')
        .isString(),

    body('location.city')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre de la ciudad debe tener entre 2 y 50 caracteres.')
        .isString(),

    body('categories.*')
        .optional()
        .isMongoId()
        .withMessage('Cada categoría debe ser un ID válido de MongoDB.')
];