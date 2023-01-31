import Category from '../models/Category';
import { Request, Response } from 'express';

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { ...data } = req.body;
        const newCategory = new Category(data);
        await newCategory.save();
        res.json({
            ok: true,
            message: 'Category has been registered'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'An error occurred while registering the product'
        });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { ...data } = req.body;
        const categoryUpdated = await Category.findOne({ _id: data._id });

        if (!categoryUpdated) {
            return res.status(404).json({
                ok: false,
                message: 'The category was not found.'
            });
        }
        categoryUpdated.name = data.name;
        categoryUpdated.description = data.name;

        await categoryUpdated.save();

        res.json({
            ok: true,
            message: 'Category has been updated'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'An error occurred while updating the category'
        });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { idCategory } = req.query;
        const category = await Category.findByIdAndRemove({ _id: idCategory });

        if (!category) {
            return res.status(404).json({
                ok: false,
                message: 'This category  does not exist'
            });
        }
        res.json({
            ok: true,
            message: 'Category has been removed'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Could not delete category'
        });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {

    try {
        const { idCategory } = req.query;
        console.log(idCategory)
        const category = await Category.findById(idCategory);

        res.json({ ok: true, category });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'An error occurred while getting the category'
        });

    }

};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.json({ ok: true, categories });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'An error occurred while getting the categories'
        });
    }

};

