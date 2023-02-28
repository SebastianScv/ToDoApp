import Task from '../../models/Task';
import { IDatabase } from '../interfaces/IDatabase';
import { BaseRepository } from './BaseRepository';

export class TasksRepository extends BaseRepository<Task> {
    private static instance: TasksRepository;
    private static database: IDatabase;

    private static readonly TABLE: string = 'tasks';

    private constructor(database: IDatabase) {
        if (!database) {
            console.error(
                'Could not create ProductsRepository, database should be provided'
            );
            return;
        }
        super(database);
    }

    public static getInstance(): TasksRepository {
        if (!TasksRepository.instance) {
            TasksRepository.instance = new TasksRepository(this.database);
        }

        return TasksRepository.instance;
    }

    public static setDatabase(database: IDatabase) {
        this.database = database;
    }

    async findAll() {
        return await super.findAll(TasksRepository.TABLE);
    }

    async findByCategory(categoryId: string) {
        return await super.findBy(
            TasksRepository.TABLE,
            'categoryId',
            categoryId
        );
    }

    async removeTasksForCategory(categoryId: string) {
        return await super.removeAll(
            TasksRepository.TABLE,
            'categoryId',
            categoryId
        );
    }

    async createTask(item: Task) {
        return await super.create(TasksRepository.TABLE, item);
    }

    async updateTask(id: string, task: Task) {
        return await super.update(TasksRepository.TABLE, id, task);
    }

    async findOne(id: string) {
        return await super.findOne(TasksRepository.TABLE, id);
    }

    async removeTask(id: string) {
        return await super.delete(TasksRepository.TABLE, id);
    }
}
