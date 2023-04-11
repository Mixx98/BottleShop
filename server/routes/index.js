'use strict';
import express from 'express';
const router = express.Router();

import usersRouter from './users.js';
import productsRouter from './products.js';
import ordersRouter from './orders.js';
import shipmentsRouter from './shipments.js';
import postsRouter from './posts.js';
import categoriesRouter from './categories.js';

router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
router.use('/shipments', shipmentsRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/categories', categoriesRouter);

export default router;