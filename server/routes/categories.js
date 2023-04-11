'use strict';
import express from 'express';
const router = express.Router();

import { Category } from '../models/index.js';
import postCategory from '../controller/categories/postCategory.js';
import updateCategory from '../controller/categories/updateCategory.js';
import deleteCategory from '../controller/categories/deleteCategory.js';

// http://localhost:8080/categories (카테고리 목록 반환)
router.get('/', async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// http://localhost:8080/categories (카테고리 추가)
router.post('/', postCategory);

// http://localhost:8080/categories/ (카테고리 수정)
router.put('/:id', updateCategory);

// http://localhost:8080/categories/ (카테고리 삭제)
router.delete('/:id', deleteCategory);

export default router;