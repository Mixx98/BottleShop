import "./SignUpConsent.css";
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
      <h1 id="consent_h1">이용약관</h1>
      <div id="consent_h3">
        <h3>이용약관</h3>
        <h3>{">"}</h3>
        <h3>기본정보 입력</h3>
        <h3>{">"}</h3>
        <h3>가입완료</h3>
      </div>
      <div>
        <div>
          <p class="name">이용약관 [필수]</p>
          <div class="list">{clause.id_1}</div>
        </div>
        <div class="boxs">
          <p>이용약관에 동의하십니까?</p>
          <div key="checkbox_1" className="mb-3">
            <Form.Check
              ref={check1}
              type="checkbox"
              id="chekbox_1"
              label="동의함"
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p class="name">개인정보 처리방침 [필수]</p>
          <div class="list">{clause.id_2}</div>
        </div>
        <div class="boxs">
          <p>개인정보 처리방침에 동의하십니까?</p>
          <div key="checkbox_2" className="mb-3">
            <Form.Check
              ref={check2}
              type="checkbox"
              id="chekbox_2"
              label="동의함"
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p class="name">마케팅 활용 동의/철회 (선택)</p>
          <div class="list">{clause.id_3}</div>
        </div>
        <div class="boxs">
          <p>마케팅 활용 동의/철회에 동의하십니까?</p>
          <div key="checkbox_3" className="mb-3">
            <Form.Check type="checkbox" id="chekbox_3" label="동의함" />
          </div>
        </div>
      </div>
      <Button id="consent_button" onClick={handleButtonClick}>
        다음
      </Button>
    </>
  );
};
export default SignUpConsent;
