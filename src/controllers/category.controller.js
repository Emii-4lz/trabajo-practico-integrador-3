import { categoryModel } from "../models/category.model.js";
import { eventModel } from "../models/event.model.js";
import { matchedData } from "express-validator";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find().populate('events');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const createCategory = async (req, res) => {
    try {
        const categoryData = matchedData(req);
        
        const newCategory = await categoryModel.create(categoryData);
        return res.status(201).json({ message: "Categoría creada satisfactoriamente.", category: newCategory });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El nombre de la categoría ya existe." });
        }
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryData = matchedData(req);

        const updatedCategory = await categoryModel.findByIdAndUpdate(categoryId, categoryData,
            { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }

        res.json({ message: "Categoría actualizada satisfactoriamente.", category: updatedCategory });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El nombre de la categoría ya existe." });
        }
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }
        await eventModel.updateMany({ categories: req.params.id }, { $pull : { categories: req.params.id } });

        return res.json({ message: "Categoría eliminada satisfactoriamente." });
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};