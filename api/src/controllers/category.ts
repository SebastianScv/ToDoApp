import { Request, Response } from 'express';
import Category from '../models/Category';
import { CategoriesRepository } from '../repositories/base/CategoriesRepository';
import { TasksRepository } from '../repositories/base/TasksRepository';

export async function getCategories(
    req: Request,
    res: Response,
    next: Function
) {
    try {
        const categories = await CategoriesRepository.getInstance().findAll();
        res.status(200).send({ categories: categories });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

export async function addCategory(req: Request, res: Response, next: Function) {
    try {
        const name = req.body.name;
        if (!name) {
            return res.status(400).send({ message: 'Name could not be empty' });
        }
        await CategoriesRepository.getInstance().createCategory(
            new Category(req.body.name)
        );
        console.log('Category created ' + req.body.name);
        res.status(200).send({ message: 'New category created' });
    } catch (error) {
        console.log('Could not create category');
        res.status(500).send({ message: 'Internal server error' });
    }
}

export async function removeCategory(
    req: Request,
    res: Response,
    next: Function
) {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            res.status(400).send({ message: 'Not all parameters provided' });
        }

        // Delete all category tasks before
        await TasksRepository.getInstance().removeTasksForCategory(categoryId);

        await CategoriesRepository.getInstance().removeCategory(categoryId);
        console.log('Category deleted ' + categoryId);
        res.status(200).send({ message: 'Category deleted' });
    } catch (error) {
        console.log('Could not remove category');
        res.status(500).send({ message: 'Internal server error' });
    }
}

export async function updateCategory(
    req: Request,
    res: Response,
    next: Function
) {
    try {
        const categoryId = req.params.categoryId;
        const name = req.body.name;

        if (!categoryId || !name) {
            return res.status(400).send({ message: 'Invalid data provided' });
        }

        const category = await CategoriesRepository.getInstance().findOne(
            categoryId
        );
        if (!category) {
            return res.status(404).send({
                message: `Cannot find category with id ${categoryId}`,
            });
        }
        category.name = name;

        await CategoriesRepository.getInstance().updateCategory(
            categoryId,
            category
        );

        res.status(200).send({ message: 'Category updated' });
    } catch (error) {
        console.log('Could not remove category');
        res.status(500).send({ message: 'Internal server error' });
    }
}
