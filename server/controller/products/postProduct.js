"use strict";
import { Product } from "../../models/index.js";

const postProduct = async (req, res, next) => {
  try {
    const { name, type, price, description, wine_type, origin, abv } = req.body;

    await Product.create({
      name,
      type,
      price,
      description,
      wine_type,
      origin,
      abv,
      image_path: req.file.path,
    });
    res.send("제품이 등록되었습니다.");
  } catch (err) {
    next(err);
  }
};

export default postProduct;
