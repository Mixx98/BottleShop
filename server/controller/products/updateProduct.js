'use strict';
import { Product } from '../../models/index.js';

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      type,
      price,
      description,
      wine_type,
      origin,
      abv,
      image_path
    } = req.body;

    await Product.updateOne(
      { _id: id },
      {
        name,
        type,
        price,
        description,
        wine_type,
        origin,
        abv,
        image_path,
      }
    );
    res.send("제품 정보가 수정되었습니다.");
  } catch (err) {
    next(err);
  }
};

export default updateProduct;