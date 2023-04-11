import "./SignUpComplete.css";
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";

// JSON 가져오기
const clause = require("./clause.json"); // 약관 내용 가져오기

const SignUpConsent = () => {
  const check1 = useRef(null);
  const check2 = useRef(null);

  const handleButtonClick = () => {
    if (check1.current.checked && check2.current.checked) {
      window.location.href = "/signup/information";
    } else {
      alert("'동의함'에 체크 해 주세요");
    }
  };
  return (
    <>
      <h1 id="complete_h1">가입완료</h1>
      <div id="complete_h3">
        <h3>이용약관</h3>
        <h3>{">"}</h3>
        <h3>기본정보 입력</h3>
        <h3>{">"}</h3>
        <h3>가입완료</h3>
      </div>
      <div>
        <p id="complete_text">가입을 축하드립니다!!</p>
      </div>
      <Button id="complete_button" href="/categories">
        홈으로
      </Button>
    </>
  );
};
export default SignUpConsent;
