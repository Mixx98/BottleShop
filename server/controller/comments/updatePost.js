'use strict';
import { Post } from '../../models/index.js';

const updatePostComment = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const comment_id = req.comment._id;
        
        await Post.updateOne({ _id: id },
            { $push: { comment: comment_id },
        });
        res.send("게시글이 수정되었습니다.");
    } catch(err) {
        next(err);
    }
};

export default updatePostComment;