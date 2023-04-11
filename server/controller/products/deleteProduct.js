"use strict";
import { Product } from "../../models/index.js";
import fs from "fs";

const deleteProduct = async (req, res, next) => {
  try{
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });
    const path = product.image_path;
    fs.unlinkSync(path);
    await Product.deleteOne({ _id: id });
    res.send("제품이 삭제되었습니다.");
  } catch (err) {
    next(err);
  }
};

export default deleteProduct;
