"use strict";
import { User } from "../../models/index.js";
import bcrypt from "bcrypt"; // "npm i bcrypt --save" 설치 필요

const deleteUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { password } = req.body;

    if (username === req.user.username) {
      // 로그인한 유저가 비밀번호 변경할 때
      if (bcrypt.compareSync(password, req.user.password) === false) {
        res.send("비밀번호가 틀렸습니다.");
      } else {
        res.clearCookie("x_auth");
        await User.deleteOne({ username });
        res.send("사용자 정보가 삭제되었습니다.");
      }
    } else if (req.user.isAdmin === true) {
      // admin이 비밀번호 변경할 때
      await User.deleteOne({ username });
      res.send("사용자 정보가 삭제되었습니다.");
    } else {
      res.send("삭제할 권한이 없습니다.");
    }
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
