'use strict';
import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';  // "npm i bcrypt --save" 설치 필요
const saltRounds = 10;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

const updateUser = async (req, res, next) => {
  try{
    const { username } = req.params;
      
    // 로그인한 유저의 비밀번호 수정 가능
    if((username === req.user.username)) {
        const {
            currentPassword,
            password,
            verifyPassword
        } = req.body;

        // currentPassword가 틀렸을 경우
        if(bcrypt.compareSync(currentPassword, req.user.password) === false) {
            res.send("현재 비밀번호가 틀렸습니다.");
        } else {
            // password와 verifyPassword가 일치하지 않은 경우
            if((password === verifyPassword) === false) {
                res.send("비밀번호가 일치하지 않습니다.");
            } else {
                // password가 비밀번호 조건에 맞지 않을 경우
                if(passwordRegex.test(password) === false) {
                    res.send("비밀번호 조건이 맞지 않습니다.");
                } else {
                    const hash = bcrypt.hashSync(password, saltRounds);
                    await User.updateOne(
                        { username },
                        { password: hash, },
                    );
                    res.send("비밀번호가 변경되었습니다.");
                }
            }
        }
    } else if(req.user.isAdmin === true) {
        const { password } = req.body;
        const hash = bcrypt.hashSync(password, saltRounds);
        // password가 비밀번호 조건에 맞지 않을 경우
        if(passwordRegex.test(password) === false) {
            res.send("비밀번호 조건이 맞지 않습니다.");
        } else {
            await User.updateOne(
                { username },
                { password: hash, },
            );
            res.send("비밀번호가 변경되었습니다.");
        }
    } else {
        res.send("비밀번호를 변경할 권한이 없습니다.");
    }
  } catch (err) {
    next(err);
  }
}

export default updateUser;