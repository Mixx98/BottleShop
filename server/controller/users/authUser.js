"use strict";

const authUser = (req, res) => {
  if (req.flagGuest === false) {
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.isAdmin,
      username: req.user.username,
      domain: req.user.domain,
      name: req.user.name,
      phone: req.user.phone,
      birthday: req.user.birthday,
    });
  } else {
    res.send("사용자 인증에 실패하였습니다.");
  }
};

export default authUser;
