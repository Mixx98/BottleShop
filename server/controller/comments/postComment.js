'use strict';
import { Comment } from '../../models/index.js';

const postComment = async (req, res, next) => {
    try {
        const { id } = req.params;      // 게시글 _id
        const { content } = req.body;

        if(req.user.isAdmin === true) {
            const comment = await Comment.create({
                post_id : id,
                content : content,
            });
            req.comment = comment;
            next();
        }
    } catch(err) {
        next(err);
    }
};

export default postComment;