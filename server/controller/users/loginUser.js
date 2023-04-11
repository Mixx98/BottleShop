"use strict";
import { User } from "../../models/index.js";
import bcrypt from "bcrypt"; // "npm i bcrypt --save" 설치 필요
import jwt from "jsonwebtoken"; // "npm i jsonwebtoken" 설치 필요
import dotenv from "dotenv";
dotenv.config();

const getLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); // username DB 존재 확인

    if (!user) {
      res.send("존재하지 않은 아이디입니다.");
      next();
    } else {
      // password 확인
      if (bcrypt.compareSync(password, user.password) === false) {
        res.send("비밀번호가 틀렸습니다.");
        next();
      } else {
        // token 생성
        const token = jwt.sign(user._id.toHexString(), "JWT_SECRET");
        if (token) {
          res.cookie("x_auth", token);
          res.send("로그인에 성공하였습니다.");
        } else {
          res.send("로그인에 실패하였습니다.");
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

export default getLogin;
