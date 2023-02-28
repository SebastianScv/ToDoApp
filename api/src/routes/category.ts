const express = require('express');
const router = express.Router();

import * as categoriesController from '../controllers/category';

router.get('/categories', categoriesController.getCategories);
router.post('/categories/add', categoriesController.addCategory);
router.put(
    '/categories/update/:categoryId',
    categoriesController.updateCategory
);
router.delete(
    '/categories/remove/:categoryId',
    categoriesController.removeCategory
);

export default router;
