import React from "react";
import { Link } from "react-router-dom";
import "./Complete.css";
import {
  FaCartArrowDown,
  FaAngleLeft,
  FaRegCreditCard,
  FaRegCheckCircle,
} from "react-icons/fa";

const Ordercomplete = () => {
  return (
    <>
      <div className="icons">
        <FaCartArrowDown size="30px" color="#566270" />
        <FaAngleLeft size="30px" color="#566270" />
        <FaRegCreditCard className="orders" size="30px" color="#566270" />
        <FaAngleLeft size="30px" color="#566270" />
        <FaRegCheckCircle size="30px" color="#6c49b8" />
      </div>
      <div id="main_container">
        <h1>
          주문/결제가 정상적으로 <br />
          완료 되었습니다.
        </h1>
        <h2>주문번호: qwe125wrehdf</h2>

        <hr />
        <div id="boxs" className="box">
          <div className="header">
            <p>주문 상품</p>
          </div>
          <div className="content">
            <p>까르베뇽 와인 외 1</p>
          </div>
        </div>
        <hr />
        <div className="box">
          <div className="header">
            <p>총주문금액</p>
          </div>
          <div className="content">
            <p>304,200원</p>
          </div>
        </div>
        <hr />
        <div className="box">
          <div className="header">
            <p>배송지</p>
          </div>
          <div className="content">
            <p>부산시 일구 이동 삼삼아파트</p>
            <p>404동 501호</p>
          </div>
        </div>
        <hr />
        <div className="box">
          <div className="header">
            <p>배송메모</p>
          </div>
          <div className="content">
            <p>배송 전에 미리 연락 바랍니다.</p>
          </div>
        </div>
        <hr />
        <div id="btn">
          <Link
            type="button"
            className="button btn btn-secondary"
            style={{ backgroundColor: "#6c49b8" }}
            to="/categories"
          >
            주문 수정하기
          </Link>
          <Link
            type="button"
            className="button btn btn-secondary"
            style={{ backgroundColor: "#6c49b8" }}
            to="/categories"
          >
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
};

export default Ordercomplete;
