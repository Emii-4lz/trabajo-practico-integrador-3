import { body } from 'express-validator';
import { userModel } from "../../models/user.model.js";

export const registerUserValidation = [
    body('username')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 20 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .trim()
        .isString(),

    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email debe ser válido')
        .trim()
        .custom(async (email) => {
            const userExists = await userModel.findOne({ email });
            if (userExists) {
                throw new Error('Este email ya está registrado');
            }
        }),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .isString(),

    body('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('El rol debe ser "user" o "admin"'),

    body('profile.firstName')
        .notEmpty().withMessage('El nombre de perfil es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre de perfil debe tener entre 2 y 50 caracteres')
        .isString(),

    body('profile.lastName')
        .notEmpty().withMessage('El apellido de perfil es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El apellido de perfil debe tener entre 2 y 50 caracteres')
        .isString(),

    body('profile.birthDate')
        .optional()
        .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida'),

    body('profile.phone')
        .optional()
        .isString(),
];

export const loginUserValidation = [
    body('email')
    .trim()
    .notEmpty()
    .withMessage("Ingrese un correo electronico registrado.")
    .isEmail()
    .withMessage("Ingrese un correo electronico valido."),

    body('password')
    .trim()
    .notEmpty()
    .withMessage("Ingrese una contraseña.")
]

export const updateProfileValidation = [
    body('profile.firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres."),

    body('profile.lastName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido debe tener entre 2 y 50 caracteres."),

    body('profile.birthDate')
        .optional()
        .isISO8601()
        .withMessage("La fecha de nacimiento ingresada no es valida."),

    body('profile.phone')
        .optional()
        .isNumeric("Ingrese unicamente numeros.")
]
    
export const updateUserValidation = [
    body('username')
        .optional()
        .isLength({ min: 3, max: 20 }).withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres.')
        .isString(),

    body('email')
        .optional()
        .isEmail().withMessage('El email debe ser valido'),

    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
        .isString(),

    body('profile.firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage("El nombre debe tener entre 2 y 20 caracteres."),

    body("profile.lastName")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido debe tener entre 2 y 50 caracteres"),

  body("profile.birthDate")
        .optional()
        .isISO8601(),

    body("profile.phone")
        .optional()
        .isNumeric()
        .withMessage("El teléfono debe contener solo números")
];