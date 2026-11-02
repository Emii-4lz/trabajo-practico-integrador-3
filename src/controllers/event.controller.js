import { eventModel } from '../models/event.model.js';
import { matchedData } from 'express-validator';

export const getAllEvents = async (req, res) => {
    try {
        const events = await eventModel.find()
        .populate('categories')
        .populate('organizer');

        return res.status(200).json(events);

    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const getEventById = async (req,res) => {
    try {
        const event = await eventModel.findOne(req.params.id)
        .populate("organizer", "-password")
        .populate("categories");

        if(!event) {
            return res.status(404).json({message:"Evento no encontrado o no existe."});
        };

        return res.status(200).json(event)
    } catch(error) {
        return res.status(500).json({message:"Error interno del servidor"})
    }
};

export const createEvent = async (req, res) => {
    try {
        const eventData = matchedData(req);

        const newEvent = await eventModel.create(eventData);

        return res.status(201).json({ message: "Evento creado satisfactoriamente.", event: newEvent });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El nombre del evento ya existe." });
        }
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const eventData = matchedData(req);
        const updatedEvent = await eventModel.findByIdAndUpdate(
            req.params.id,
            eventData,
            { new: true });
        
        if (!updatedEvent) {
            return res.status(404).json({ message: "Evento no encontrado." });
        }

        return res.status(200).json({ message: "Evento actualizado satisfactoriamente.", event: updatedEvent });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El nombre del evento ya existe." });
        }
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const deleteEvent = async (req,res) => {
    try {
        const deletedEvent = await eventModel.findByIdAndDelete(req.params.id);

        if (!deletedEvent){
            return res.status(404).json({message:"Evento no encontrado"})
        }

        return res.status(200).json({message:"Evento eliminado correctamente"});
    } catch (error) {
        return res.status(500).json({message:"Error interno del servidor"})
    }
};