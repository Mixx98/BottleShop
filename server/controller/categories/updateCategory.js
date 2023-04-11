'use strict';
import { Category } from '../../models/index.js';

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await Category.updateOne(
      { _id: id },
      { name, }
    );
    res.send("카테고리 수정되었습니다.");
  } catch (err) {
    next(err);
  }
};

export default updateCategory;