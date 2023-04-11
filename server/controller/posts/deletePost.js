'use strict';
import { Post } from '../../models/index.js';

const deletePost = async (req, res, next) => {
    const { id } = req.params;
    await Post.deleteOne({ id });
    res.send("게시글이 삭제되었습니다.");
};

export default deletePost;