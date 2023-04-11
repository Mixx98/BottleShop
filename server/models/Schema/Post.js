'use strict';
import { Schema } from 'mongoose';

const PostSchema = new Schema(
  {
    isAdmin: false,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isAdmin: {
      type: Schema.Types.Boolean,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      default: '작성자',
    },
    comment : [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true, }
);

export default PostSchema;