'use strict';
import express from 'express';
const router = express.Router();

import { Order } from '../models/index.js';
import postOrder from '../controller/orders/postOrder.js';
import updateOrder from '../controller/orders/updateOrder.js';
import deleteOrder from '../controller/orders/deleteOrder.js';

// http://localhost:8080/orders (주문 목록 반환)
router.get('/', async (req, res) => {
  const orders = await Order.find({})
    .populate({ path: 'product_id', select: 'wine_type price' })
    .populate({ path: 'user_id', select: 'username' })
    .exec();
  res.json(orders);
});

// http://localhost:8080/orders (주문 추가)
router.post('/', postOrder);

// http://localhost:8080/orders/edit/:id (주문 수정)
router.put('/:id', updateOrder);

// http://localhost:8080/orders/:_id (주문 삭제)
router.delete('/:id', deleteOrder);

export default router;
