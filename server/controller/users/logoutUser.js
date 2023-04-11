'use strict';
import { User } from '../../models/index.js';

const logoutUser = async (req, res, next) => {
  try {
      User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
          if(err) return res.send("로그아웃에 실패하였습니다.");
          res.clearCookie("x_auth");
          return res.send("로그아웃에 성공하였습니다.");
      });     
  } catch (err) {
    next(err);
  }
};

export default logoutUser;
