import { eventModel } from '../models/event.model.js';

export const adminOrOwnerMiddleware = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const userRole = req.user.role;
        const eventId = req.params.id;

        if (userRole === "admin") {
            return next();
        }

        const event = await eventModel.findById(eventId);

        if (!event) {
            return res.status(404).json({ msg: "Evento no encontrado" });
        }

        if (event.organizer.toString() !== userId.toString()) {
            return res.status(403).json({ msg: "Denegado." });
        }
        next();

    } catch (error) {
        return res.status(500).json({ msg: "Error interno del servidor", error: error.message });
    }
};