'use strict';
import express from 'express';
const router = express.Router();

import { User } from '../models/index.js';
import auth from '../middleware/auth.js';
import postUser from '../controller/users/postUser.js';
import loginUser from '../controller/users/loginUser.js';
import authUser from '../controller/users/authUser.js';
import logoutUser from '../controller/users/logoutUser.js';
import deleteUser from '../controller/users/deleteUser.js';
import updateUser from '../controller/users/updateUser.js';
import updatePassword from '../controller/users/updatePassword.js';

// http://localhost:8080/users (전체 회원 조회)
router.get('/', auth, async (req, res) => {
  if(req.user.isAdmin === true){
    const users = await User.find({});
    res.json(users);
  } else {
    res.send("사용자 정보를 조회할 권한이 없습니다.");
  }
});

// http://localhost:8080/users (회원가입)
router.post("/", postUser);

// http://localhost:8080/users/login (로그인)
router.post("/login", loginUser);

// http://localhost:8080/users/auth (현재 로그인한 user 정보)
router.get("/auth", auth, authUser);

// http://localhost:8080/users/logout (로그아웃)
router.get("/logout", auth, logoutUser);

// http://localhost:8080/users/test1 (유저 정보 DB 삭제)
router.delete('/:username', auth, deleteUser);

// http://localhost:8080/users/test1 (유저 정보 수정)
router.put('/:username', auth, updateUser);

// http://localhost:8080/users/test1/password (유저 정보 수정)
router.put('/:username/password', auth, updatePassword);

export default router;
