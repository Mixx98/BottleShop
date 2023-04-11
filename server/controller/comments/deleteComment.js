'use strict';
import { Post, Comment } from '../../models/index.js';

const deleteComment = async (req, res, next) => {
    try {
        const {
            post_id,
            comment_id
        } = req.params;

        // CommentList DB에서 댓글을 지우는 과정
        await Comment.deleteOne({ _id : comment_id });
        // PostList DB에서 댓글을 지우는 과정
        await Post.updateOne(
            { _id : post_id },
            { $pull: { comment: comment_id },
        });
        res.send("게시글에 댓글이 등록되었습니다.");
    } catch (err) {
        next(err);
    }
};

export default deleteComment;