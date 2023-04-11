'use strict';
import { Schema } from 'mongoose';

const ShipmentSchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    guest_id: {
      type: Schema.Types.ObjectId,
      ref: 'Guest',
    },
    tracking_number: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    request: {
      type: String,
      default: '대문 앞',
    },
  },
  { timestamps: true }
);

export default ShipmentSchema;
