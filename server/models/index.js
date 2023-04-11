// 스키마 모델화
'use strict';
import mongoose from 'mongoose';

import UserSchema from './Schema/User.js';
import GuestSchema from './Schema/Guest.js';
import PostSchema from './Schema/Post.js';
import CommentSchema from './Schema/Comment.js';
import OrderSchema from './Schema/Order.js';
import ProductSchema from './Schema/Product.js';
import ShipmentSchema from './Schema/Shipment.js';
import CategorySchema from './Schema/Category.js';

const User = mongoose.model('User', UserSchema, 'UserList');
const Guest = mongoose.model('Guest', GuestSchema, 'GuestList');
const Post = mongoose.model('Post', PostSchema, 'PostList');
const Comment = mongoose.model('Comment', CommentSchema, 'CommentList');
const Order = mongoose.model('Order', OrderSchema, 'OrderList');
const Product = mongoose.model('Product', ProductSchema, 'ProductList');
const Shipment = mongoose.model('Shipment', ShipmentSchema, 'ShipmentList');
const Category = mongoose.model('Category', CategorySchema, 'CategoryList');

export { User, Guest, Post, Comment, Order, Product, Shipment, Category };