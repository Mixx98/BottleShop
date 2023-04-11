'use strict';
import express from 'express';
const router = express.Router();

import { Post } from '../models/index.js';
import auth from '../middleware/auth.js';
import postPost from '../controller/posts/postPost.js';
import updatePost from '../controller/posts/updatePost.js';
import deletePost from '../controller/posts/deletePost.js';
import viewComment from '../controller/comments/viewComment.js';
import postComment from '../controller/comments/postComment.js';
import updateComment from '../controller/comments/updateComment.js';
import deleteComment from '../controller/comments/deleteComment.js';
import updatePostComment from '../controller/comments/updatePost.js';

// http://localhost:8080/posts (목록 조회)
router.get('/', auth, async (req, res, next) => {
    /*
    if (req.query.write) {
        res.render('post/edit');
        return;
    } */

    const post = await Post.find({}); // 게시글 목록
    res.json(post);

    // res.render('post/list', { posts });
});

// http://localhost:8080/posts (게시글 등록)
router.post('/edit', auth, postPost);

// http://localhost:8080/posts/63f5efa95a989574006dd816 (게시글 수정)
router.put('/:id', updatePost);

// http://localhost:8080/posts/63f5efa95a989574006dd816 (게시글 삭제)
router.delete('/:id', deletePost);

// http://localhost:8080/posts/63f5efa95a989574006dd816/comments (댓글 조회)
router.get('/:id/comments', viewComment);

// http://localhost:8080/posts/63f5efa95a989574006dd816/comments (댓글 등록)
router.post('/:id/comments', auth, postComment, updatePostComment);

// http://localhost:8080/posts/63f79f6cd15bc5d61ac1a685/comments/63f79fd0d15bc5d61ac1a697 (댓글 수정)
router.put('/:post_id/comments/:comment_id', updateComment);

// http://localhost:8080/posts/63f79f6cd15bc5d61ac1a685/comments/63f79fd0d15bc5d61ac1a697 (댓글 삭제)
router.delete('/:post_id/comments/:comment_id', deleteComment);

export default router;