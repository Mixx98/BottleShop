import React, { useEffect, useRef, useState } from "react";
import "./MypageInformation.css";
import { Nav, Button, Form } from "react-bootstrap";
import axios from "axios";

const MypageOrder = () => {
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
  let inputName = useRef(null);
  let inputPhone = useRef(null);
  let inputBirthday = useRef(null);

  const handlePutButtonClick = async () => {
    const name = inputName.current.value;
    const phone = inputPhone.current.value;
    const birthday = inputBirthday.current.value;

    await axios
      .put(api.users_PUT + cookieUserData.username, {
        name,
        phone,
        birthday,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          window.location.href = "/mypage/information";
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div id="mypage_information_title">
        반갑습니다. {cookieUserData?.name}({cookieUserData?.username})님
      </div>

      {/* 네비게이션 바 */}
      <Nav
        id="mypage_information_nav_bar"
        variant="tabs"
        defaultActiveKey="/mypage/information"
      >
        <Nav.Item>
          <Nav.Link id="mypage_information_nav" href="/mypage/order">
            주문조회
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_information_nav" href="/mypage/information">
            회원정보수정
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_information_nav" href="/mypage/password">
            비밀번호변경
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_information_nav" href="/mypage/leave">
            회원탈퇴
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* 데이터 수정 */}
      <div id="mypage_information_data">
        <div id="mypage_information_other">
          <Form.Group className="mypage_information_input">
            <Form.Label id="mypage_text">이름</Form.Label>
            <Form.Control
              id="mypage_text"
              ref={inputName}
              type="text"
              placeholder="홍길동"
            />
          </Form.Group>

          <Form.Group className="mypage_information_input">
            <Form.Label id="mypage_text">휴대폰번호</Form.Label>
            <Form.Control
              id="mypage_text"
              ref={inputPhone}
              type="phone"
              placeholder="010-1234-5678"
            />
          </Form.Group>

          <Form.Group className="mypage_information_input">
            <Form.Label id="mypage_text">생일</Form.Label>
            <Form.Control id="mypage_text" ref={inputBirthday} type="date" />
          </Form.Group>
        </div>
        <div id="mypage_information_button">
          <Button
            id="mypage_information_save_button"
            onClick={handlePutButtonClick}
          >
            저장
          </Button>
        </div>
      </div>
    </>
  );
};
export default MypageOrder;
