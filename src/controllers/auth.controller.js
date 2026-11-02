import { matchedData } from 'express-validator';
import { signToken } from '../helpers/jwt.helper.js';
import { userModel } from '../models/user.model.js';
import { hashPassword, comparePassword } from '../helpers/bcrypt.helper.js';

export const register = async (req, res) => {
    try {
        const userData = matchedData(req);
        const { username, email, password, profile } = userData;

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            profile,
        });
        res.status(201).json({ message: 'Usuario registrado satisfactoriamente.', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.', error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = matchedData(req);
        const userExists = await userModel.findOne({ email, deletedAt: null });

        if (!userExists) {
            return res.status(401).json({ message: 'Credenciales incorrectas o no registradas.' });
        }

        const isMatch = await comparePassword(password, userExists.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        const token = signToken({ id: userExists._id, role: userExists.role });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
        });
        res.json({ message: 'Se ha iniciado sesión satisfactoriamente.', token });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.', error });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.', error });
    }
};

export const logout = async (_req, res) => {
  try {
    res.clearCookie("token");
    return res.status(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};