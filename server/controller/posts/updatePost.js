'use strict';
import { Post } from '../../models/index.js';

const updatePost = async (req, res, next) => {
  try{
    const { id } = req.params;
    const { title, content } = req.body;
  
    const post = await Post.updateOne(
        { _id : id },
        {
            title,
            content,
        }
    );

    // res.redirect(`/posts/${id}`);

    res.send(post);
  } catch (err) {
    next(err);
  }
}

export default updatePost;