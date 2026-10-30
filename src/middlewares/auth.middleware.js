import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token; 
        if (!token) {
            return res.status(401).json({ message: "No autorizado: Token no encontrado" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);
        if (!user || user.deletedAt) {
            return res.status(401).json({ message: "No autorizado: Usuario no válido o eliminado" });
        }

        req.user = user; 
        next();

    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
};