import React, { useEffect, useState, useRef } from "react";
import "./MypageLeave.css";
import {
  Nav,
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
} from "react-bootstrap";
import axios from "axios";

const MypageOrder = () => {
  const [cookieUserData, setCookieUserData] = useState(null); // 쿠키 유저이름
  const inputPassword = useRef();
  const api = require("../../api.json"); // API 불러오기

  const getName = async () => {
    setCookieUserData(
      await axios.get(api.users_auth_GET).then((response) => response.data) // 쿠키 유저이름 가져오기
    );
  };

  useEffect(() => {
    getName();
  }, []);

  const handleLeaveClick = async () => {
    const password = inputPassword.current.value;
    await axios
      .delete(api.users_DELETE + cookieUserData.username, {
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          window.location.href = "/categories";
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div id="mypage_leave_title">
        반갑습니다. {cookieUserData?.name}({cookieUserData?.username})님
      </div>

      {/* 네비게이션 바 */}
      <Nav
        id="mypage_leave_nav_bar"
        variant="tabs"
        defaultActiveKey="/mypage/leave"
      >
        <Nav.Item>
          <Nav.Link id="mypage_leave_nav" href="/mypage/order">
            주문조회
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_leave_nav" href="/mypage/information">
            회원정보수정
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_leave_nav" href="/mypage/password">
            비밀번호변경
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_leave_nav" href="/mypage/leave">
            회원탈퇴
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 탈퇴 */}
      <div id="mypage_leave_box">
        <p id="mypage_leave_text">탈퇴 하실려면 비밀번호를 입력해 주세요</p>
        <div id="mypage_leave_password">
          <Form.Control
            id="mypage_leave_input_password"
            ref={inputPassword}
            type="text"
          />
          <Button
            id="mypage_information_leave_button"
            onClick={handleLeaveClick}
          >
            탈퇴하기
          </Button>
        </div>
      </div>
    </>
  );
};
export default MypageOrder;
