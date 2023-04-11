import React, { useEffect, useRef, useState } from "react";
import "./MypagePassword.css";
import { Nav, Button, Form } from "react-bootstrap";
import axios from "axios";

const MypagePassword = () => {
  const [cookieUserData, setCookieUserData] = useState(null); // 쿠키 유저이름
  const api = require("../../api.json"); // API 불러오기

  const getName = async () => {
    setCookieUserData(
      await axios.get(api.users_auth_GET).then((response) => response.data) // 쿠키 유저이름 가져오기
    );
  };

  useEffect(() => {
    getName();
  }, []);

  // Element 제어
  let inputBeforePassword = useRef(null);
  let inputPassword = useRef(null);
  let inputPasswordCheck = useRef(null);

  // 로그아웃 함수
  const handleLogoutClick = async () => {
    await axios
      .get(api.users_logout_GET)
      .then((response) => {
        if (response.data.success === true) {
          window.location.href("/login");
        }
      })
      .catch((err) => alert(err.message));
  };

  // 비밀번호 변경 함수
  const handlePutButtonClick = async () => {
    const currentPassword = inputBeforePassword.current.value;
    const password = inputPassword.current.value;
    const verifyPassword = inputPasswordCheck.current.value;

    await axios
      .put(api.users_PUT + cookieUserData.username + "/password", {
        currentPassword,
        password,
        verifyPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          handleLogoutClick();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div id="mypage_password_title">
        반갑습니다. {cookieUserData?.name}({cookieUserData?.username})님
      </div>
      {/* 네비게이션 바 */}
      <Nav
        id="mypage_password_nav_bar"
        variant="tabs"
        defaultActiveKey="/mypage/password"
      >
        <Nav.Item>
          <Nav.Link id="mypage_password_nav" href="/mypage/order">
            주문조회
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_password_nav" href="/mypage/information">
            회원정보수정
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_password_nav" href="/mypage/password">
            비밀번호변경
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_password_nav" href="/mypage/leave">
            회원탈퇴
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* 데이터 수정 */}
      <div id="mypage_password_data">
        <div id="mypage_password_password">
          <Form.Group className="mypage_password_input">
            <Form.Label id="mypage_text">현재 비밀번호</Form.Label>
            <Form.Control
              id="mypage_text"
              ref={inputBeforePassword}
              type="password"
              placeholder="문자+숫자 8~16자리"
            />
          </Form.Group>
          <Form.Group className="mypage_password_input">
            <Form.Label id="mypage_text">변경할 비밀번호</Form.Label>
            <Form.Control
              id="mypage_text"
              ref={inputPassword}
              type="password"
              placeholder="문자+숫자 8~16자리"
            />
          </Form.Group>

          <Form.Group className="mypage_password_input">
            <Form.Label id="mypage_text">변경할 비밀번호 확인 </Form.Label>
            <Form.Control
              id="mypage_text"
              ref={inputPasswordCheck}
              type="password"
              placeholder="문자+숫자 8~16자리"
            />
          </Form.Group>
        </div>
        <div id="mypage_password_button">
          <Button
            id="mypage_password_save_button"
            onClick={handlePutButtonClick}
          >
            저장
          </Button>
        </div>
      </div>
    </>
  );
};
export default MypagePassword;
