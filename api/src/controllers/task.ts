import { Request, Response } from 'express';
import Task from '../models/Task';
import { CategoriesRepository } from '../repositories/base/CategoriesRepository';
import { TasksRepository } from '../repositories/base/TasksRepository';

export async function getTasks(req: Request, res: Response, next: Function) {
    try {
        const categoryId = req.params.categoryId;
        console.log(categoryId);
        const tasks = await TasksRepository.getInstance().findByCategory(
            categoryId
        );
        res.status(200).send({ tasks: tasks });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

export async function addTask(req: Request, res: Response, next: Function) {
    try {
        const categoryId = req.body.categoryId;
        const category = await CategoriesRepository.getInstance().findOne(
            categoryId
        );
        console.log(category);
        if (!category) {
            res.status(400).send({ message: 'Category does not exist' });
        }

        await TasksRepository.getInstance().createTask(
            new Task(req.body.name, req.body.done, categoryId)
        );
        console.log('Task created ' + req.body.name);
        res.status(200).send({ message: 'New task created' });
    } catch (error) {
        console.log('Could not create task');
        res.status(500).send({ message: 'Internal server error' });
    }
}

export async function removeTask(req: Request, res: Response, next: Function) {
    try {
        await TasksRepository.getInstance().removeTask(req.params.taskId);
        console.log('Task deleted ' + req.params.categoryId);
        res.status(200).send({ message: 'Task deleted' });
    } catch (error) {
        console.log('Could not remove Task');
        res.status(500).send({ message: 'Internal server error' });
    }
}

export async function updateTask(req: Request, res: Response, next: Function) {
    try {
        const taskId = req.params.taskId;
        const name = req.body.name;

        if (!taskId || !name) {
            return res.status(400).send({ message: 'Invalid data provided' });
        }

        const task = await TasksRepository.getInstance().findOne(taskId);
        if (!task) {
            return res.status(404).send({
                message: `Cannot find category with id ${taskId}`,
            });
        }
        task.name = name;
        task.done = req.body.done;

        await TasksRepository.getInstance().updateTask(taskId, task);

        res.status(200).send({ message: 'Task updated' });
    } catch (error) {
        console.log('Could not remove category');
        res.status(500).send({ message: 'Internal server error' });
    }
}
