import React, { useEffect, useState } from "react";
import "./MypageOrder.css";
import { Nav, Accordion, Button } from "react-bootstrap";
import axios from "axios";

const MypageOrder = () => {
  const [cookieUserDB, setCookieUserDB] = useState(null); // 쿠키 유저이름
  const [ordersDB, setordersDB] = useState(null); // orders DB
  const [shipmentsDB, setshipmentsDB] = useState(null); // shipments DB
  const [productsDB, setproductsDB] = useState(null); // products DB
  const api = require("../../api.json"); // API 불러오기

  const getName = async () => {
    setCookieUserDB(
      await axios.get(api.users_auth_GET).then((response) => response.data) // 쿠키 유저이름 가져오기
    );
  };

  const getOrder = async () => {
    setordersDB(
      await axios.get(api.orders_GET).then((response) => response.data) // orders data 가져오기
    );
  };

  const getShipment = async () => {
    setshipmentsDB(
      await axios.get(api.shipment_GET).then((response) => response.data) // shipments data 가져오기
    );
  };

  const getDate = async () => {
    const response = await axios.get(api.products_GET);
    setproductsDB(response.data); // products data 가져오기
  };

  const [before, setBefore] = useState(0);
  const [ing, setIng] = useState(0);
  const [complete, setComplete] = useState(0);

  const setCount = () => {
    let beforeCount = 0;
    let ingCount = 0;
    let completeCount = 0;

    cookieUsershipmentsData.map((val) => {
      if (val.status === "배송전") beforeCount++;
      else if (val.status === "배송중") ingCount++;
      else if (val.status === "배송완료") completeCount++;
    });
    // console.log(beforeCount);
    // console.log(ingCount);
    // console.log(completeCount);

    setBefore(beforeCount);
    setIng(ingCount);
    setComplete(completeCount);
  };

  let cookieUserordersData = [];
  ordersDB?.map((data) => {
    if (data.user_id["_id"] === cookieUserDB?._id) {
      cookieUserordersData.push(data);
    }
  });

  let cookieUsershipmentsData = [];
  shipmentsDB?.map((data) => {
    if (data.user_id === cookieUserDB?._id) {
      cookieUsershipmentsData.push(data);
    }
  });

  useEffect(() => {
    getName();
    getOrder();
    getShipment();
    getDate();
    setCount();
  }, []);

  const handleCancleClick = async (id) => {
    console.log(id);
    await axios
      .delete(api.orders_DELETE + id)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div id="mypage_order_title">
        반갑습니다. {cookieUserDB?.name}({cookieUserDB?.username})님
      </div>

      {/* 네비게이션 바 */}
      <Nav
        id="mypage_order_nav_bar"
        variant="tabs"
        defaultActiveKey="/mypage/order"
      >
        <Nav.Item>
          <Nav.Link id="mypage_order_nav" href="/mypage/order">
            주문조회
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_order_nav" href="/mypage/information">
            회원정보수정
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_order_nav" href="/mypage/password">
            비밀번호변경
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="mypage_order_nav" href="/mypage/leave">
            회원탈퇴
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div id="mypage_order_count">
        <div class="mypage_order_box">
          <p>구매내역</p>
          <p>{cookieUsershipmentsData.length}</p>
        </div>
        <div class="mypage_order_box">
          <p>배송전</p>
          <p>{before}</p>
        </div>
        <div class="mypage_order_box">
          <p>배송중</p>
          <p>{ing}</p>
        </div>
        <div class="mypage_order_box">
          <p>배송완료</p>
          <p>{complete}</p>
        </div>
      </div>

      {/* 주문 리스트 */}
      <Accordion id="mypage_order_orderlist">
        {cookieUsershipmentsData?.map((shipmentsData) => (
          <>
            <Accordion.Item eventKey={shipmentsData?._id}>
              <Accordion.Header>
                {shipmentsData.createdAt.split("T")[0]} 주문 [
                {shipmentsData.status}]
              </Accordion.Header>
              <Accordion.Body>
                <Button
                  id="mypage_order_cancle_button"
                  onClick={() => handleCancleClick(shipmentsData._id)}
                  disabled={shipmentsData.status === "배송전" ? false : true}
                >
                  취소하기
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </>
        ))}
      </Accordion>
    </>
  );
};
export default MypageOrder;
