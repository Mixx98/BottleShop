import React, { useRef } from "react";
import "./SignUpInformation.css";
import { Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";

// JSON 가져오기
const domainList = require("../../domainList.json"); // Domain 리스트 불러오기
const api = require("../../api.json"); // API 불러오기

// Domain List 만들기
const domainSelect = [];
domainList.forEach((data, index) => {
  domainSelect.push(
    <option key={index} value={data.name}>
      {data.name}
    </option>
  );
});

const SignUpInformation = () => {
  const inputUserName = useRef(null);
  const inputDomain = useRef(null);
  const inputPassword = useRef(null);
  const inputPasswordCheck = useRef(null);
  const inputName = useRef(null);
  const inputPhone = useRef(null);
  const inputBirthday = useRef(null);

  const handleButtonClick = async () => {
    const username = inputUserName.current.value;
    const domain = inputDomain.current.value;
    const password = inputPassword.current.value;
    const password_check = inputPasswordCheck.current.value;
    const name = inputName.current.value;
    const phone = inputPhone.current.value;
    const birthday = inputBirthday.current.value;

    if (password === password_check) {
      await axios
        .post(api.users_POST, {
          username,
          domain,
          password,
          name,
          phone,
          birthday,
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data === "User already exists")
              alert("ID가 이미 존재합니다.");
            else window.location.href = "/signup/complete";
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } else alert("비밀번호가 일치하지 않습니다.");
  };

  return (
    <>
      <h1 id="information_h1">이용약관</h1>
      <div id="information_h3">
        <h3>이용약관</h3>
        <h3>{">"}</h3>
        <h3>기본정보 입력</h3>
        <h3>{">"}</h3>
        <h3>가입완료</h3>
      </div>
      <Form id="information_form">
        <Row className="information_input">
          <Form.Group as={Col}>
            <Form.Label className="information_label">아이디 *</Form.Label>
            <Form.Control ref={inputUserName} type="text" />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="information_label">도메인 *</Form.Label>
            <Form.Select ref={inputDomain}>
              <option></option>
              {domainSelect}
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="information_input">
          <Form.Label className="information_label">비밀번호 *</Form.Label>
          <Form.Control ref={inputPassword} type="password" />
        </Form.Group>

        <Form.Group className="information_input">
          <Form.Label className="information_label">비밀번호 확인 *</Form.Label>
          <Form.Control ref={inputPasswordCheck} type="password" />
        </Form.Group>

        <Form.Group className="information_input">
          <Form.Label className="information_label">이름 *</Form.Label>
          <Form.Control ref={inputName} type="text" />
        </Form.Group>

        <Form.Group className="information_input">
          <Form.Label className="information_label">전화번호 *</Form.Label>
          <Form.Control ref={inputPhone} type="phone" />
        </Form.Group>

        <Form.Group className="information_input">
          <Form.Label className="information_label">생년월일 *</Form.Label>
          <Form.Control ref={inputBirthday} type="date" />
        </Form.Group>
      </Form>{" "}
      <Button id="information_button" onClick={handleButtonClick}>
        가입하기
      </Button>
    </>
  );
};
export default SignUpInformation;
