'use strict';
import express from 'express';
const router = express.Router();

import { Shipment } from '../models/index.js';
import postShipment from '../controller/shipments/postShipment.js';
import {
  updateShipment,
  statusShipment,
} from '../controller/shipments/updateShipment.js';
import deleteShipment from '../controller/shipments/deleteShipment.js';

// http://localhost:8080/shipments (배송 목록 반환)
router.get('/', async (req, res) => {
  const shipments = await Shipment.find({});
  res.json(shipments);
});

// http://localhost:8080/shipments (배송 등록)
router.post('/', postShipment);

// http://localhost:8080/shipments (배송 수정)
router.put('/:id', updateShipment);
router.put('/status/:id', statusShipment);

// http://localhost:8080/shipments (배송 삭제)
router.delete('/:id', deleteShipment);

export default router;
