import Category from '../../models/Category';
import { IDatabase } from '../interfaces/IDatabase';
import { BaseRepository } from './BaseRepository';

export class CategoriesRepository extends BaseRepository<Category> {
    private static instance: CategoriesRepository;
    private static database: IDatabase;

    private static readonly TABLE: string = 'categories';

    private constructor(database: IDatabase) {
        if (!database) {
            console.error(
                'Could not create ProductsRepository, database should be provided'
            );
            return;
        }
        super(database);
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.instance) {
            CategoriesRepository.instance = new CategoriesRepository(
                this.database
            );
        }

        return CategoriesRepository.instance;
    }

    public static setDatabase(database: IDatabase) {
        this.database = database;
    }

    async findAll() {
        return await super.findAll(CategoriesRepository.TABLE);
    }

    async createCategory(item: Category) {
        return await super.create(CategoriesRepository.TABLE, item);
    }

    async updateCategory(id: string, category: Category) {
        return await super.update(CategoriesRepository.TABLE, id, category);
    }

    async findOne(id: string) {
        return await super.findOne(CategoriesRepository.TABLE, id);
    }

    async removeCategory(id: string) {
        return await super.delete(CategoriesRepository.TABLE, id);
    }
}
