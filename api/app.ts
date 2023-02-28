import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { MongoDatabase } from './src/repositories/databases/MongoDatabase';
import { CategoriesRepository } from './src/repositories/base/CategoriesRepository';
import { TasksRepository } from './src/repositories/base/TasksRepository';
// Repositories
const database = new MongoDatabase();
CategoriesRepository.setDatabase(database);
TasksRepository.setDatabase(database);

import { get404 } from './src/controllers/error';
import defaultRoutes from './src/routes/default';
import categoryRoutes from './src/routes/category';
import taskRoutes from './src/routes/task';

var cors = require('cors');

// Express initialization
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(defaultRoutes);
app.use(categoryRoutes);
app.use(taskRoutes);
app.use('/', get404);

app.listen(3000, () => {
    console.log('Server started running on port 3000!');
});
