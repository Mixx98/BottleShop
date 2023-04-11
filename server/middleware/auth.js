// 회원/비회원 인증 로직
"use strict";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken"; // "npm i jsonwebtoken" 설치 필요
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.x_auth;
    const guest = token === undefined;

    if (guest === false) {
      const decoded = jwt.verify(token, "JWT_SECRET");
      const user = await User.findOne({ _id: decoded });

      if (!user) return res.json({ isAuth: false, error: true });
      req.token = token;
      req.user = user;
      req.flagGuest = false;
      next();
    } else {
      req.flagGuest = true;
      next();
    }
  } catch (err) {
    next(err);
  }
};

export default auth;
