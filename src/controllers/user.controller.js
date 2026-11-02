import { userModel } from "../models/user.model.js";
import { matchedData } from "express-validator";
import { eventModel } from "../models/event.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        .populate('events')
        .select('-password');

    return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id, { deletedAt: null })
        .populate('events')
        .select('-password');

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const createUser = async (req, res) => {
    try {
        const userData = matchedData(req);
        userData.password = await hashPassword(userData.password);

        const user = await userModel.create(userData);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userData = matchedData(req);
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, userData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndUpdate(req.params.id,
            { deletedAt: new Date() },
            { new: true });
        
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        await eventModel.deleteMany({ organizer: req.params.id });

        return res.status(200).json({ message: "Usuario eliminado satisfactoriamente." });
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};