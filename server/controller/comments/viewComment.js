'use strict';
import { Post } from '../../models/index.js';

const viewComment = async (req, res) => {
    try {
        const { id } = req.params;

        await Post.findOne({ _id : id })
            .populate('comment', 'post_id content createdAt updatedAt')
            .exec();
        res.send("댓글이 작성되었습니다.");
    } catch (err) {
        next(err);
    }
};

export default viewComment;