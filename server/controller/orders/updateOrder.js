'use strict';
import { Order } from '../../models/index.js';

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { product_id, count } = req.body;

    await Order.updateOne(
      { _id: id },
      {
        product_id,
        count,
      }
    );
    res.send('주문 정보가 수정되었습니다.');
  } catch (err) {
    next(err);
  }
};

export default updateOrder;
