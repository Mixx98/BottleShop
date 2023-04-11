'use strict';
import { Category } from '../../models/index.js';

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await Category.deleteOne({ _id: id });
    res.send("카테고리가 삭제되었습니다.");
  } catch (err) {
    next(err);
  }
};

export default deleteCategory;