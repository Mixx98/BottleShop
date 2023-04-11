'use strict';
import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    isAdmin: false,
    username: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    auth_email : {
      type: Boolean,
      default: false,
    },
    birthday: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, }
);

export default UserSchema;