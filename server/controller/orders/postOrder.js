'use strict';
import { Order } from '../../models/index.js';

const postOrder = async (req, res, next) => {
  const { user_id, guest_id, product_id, count } = req.body;
  try {
    // calculate #count
    const cal = product_id.reduce((accu, curr) => {
      accu[curr] = (accu[curr] || 0) + 1;
      return accu;
    }, {});

    const orderInfo = await Order.create({
      user_id,
      guest_id,
      product_id,
      count: cal,
    });

    // populate product_id
    const result = await Order.findOne({ _id: orderInfo._id })
      .populate({ path: 'product_id', select: 'wine_type price' })
      .populate({ path: 'user_id', select: 'username' })
      .exec();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export default postOrder;
