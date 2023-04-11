'use strict';
import { Category } from '../../models/index.js';

const postCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    await Category.create({ name, });
    res.send('카테고리가 등록되었습니다.');
  } catch (err) {
    next(err);
  }
};

export default postCategory;