'use strict';
import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    guest_id: {
      type: Schema.Types.ObjectId,
      ref: 'Guest',
    },
    product_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    count: Object,
  },
  { timestamps: true, }
);

export default OrderSchema;