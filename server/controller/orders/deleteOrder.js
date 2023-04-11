'use strict';
import { Order } from '../../models/index.js';

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params; // order_id
  
    if (!req.query.select) {
      await Order.deleteOne({ _id: id });
      res.send("주문이 삭제되었습니다.");
    } else {
      await Order.updateOne(
        { _id : id },
        { $pull: { product_id: req.query.select },
      });
      res.send("해당 주문의 상품이 삭제되었습니다.");
    }
  } catch (err) {
    next(err);
  }
};

export default deleteOrder;