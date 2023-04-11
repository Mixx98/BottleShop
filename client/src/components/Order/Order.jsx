import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Order.css";
import Post from "./Post.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  FaCartArrowDown,
  FaAngleLeft,
  FaRegCreditCard,
  FaRegCheckCircle,
} from "react-icons/fa";
import Card from "react-bootstrap/Card";

// npm install react-icons --save 설치해야함

const api = require("../../api.json");

const Order = (props) => {
  // const [cookieUserData, setCookieUserData] = useState(null); // 쿠키 유저이름
  // const handleShow = async () => {
  //   setCookieUserData(
  //     await axios.get(api.users_auth_GET).then((response) => response.data) // 쿠키 유저이름 가져오기
  //   );
  // };

  // // [GET] 데이터 불러오기
  // const [dataList, setDataList] = useState(null);

  // const getDate = async () => {
  //   const response = await axios.get(api.orders_GET);
  //   setDataList(response.data);
  // };

  // useEffect(() => {
  //   getDate();
  // }, []);

  // localStorage에서 데이터 가져오기
  const [shoppingItem, setShoppingItem] = useState([]);
  useEffect(() => {
    const Items = JSON.parse(localStorage.getItem("orderList")) || [];
    setShoppingItem(Items);
  }, []);

  // let inputRecipient = useRef();
  // let inputPhone = useRef();
  // let inputAddress1 = useRef();
  // let inputAddress2 = useRef(null);
  // let inputW_count = useRef(null);
  // let inputPrice = useRef(null);

  // 계속 주문하기 버튼
  const onClickComplete = (e) => {
    window.location.href = "/order/complete";
  };

  // [POST] 데이터 전송하기
  // const handlePostButtonClick = async () => {
  //   const recipient = inputRecipient.current.value;
  //   const phone = inputPhone.current.value;
  //   const address1 = inputAddress1.current.value;
  //   const address2 = inputAddress2.current.value;
  //   const w_count = inputW_count.current.value;
  //   const price = inputPrice.current.value;

  //   await axios
  //     .post(api.orders_POST, {
  //       w_count,
  //       price,
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });

  //   await axios
  //     .post(api.shipment_POST, {
  //       recipient,
  //       phone,
  //       address1,
  //       address2,
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         alert(response.data);
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // };

  // 주소검색
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    props.setcompany({
      ...props.company,
      address: fullAddress,
    });
  };

  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const [popup, setPopup] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = (data) => {
    setPopup(!popup);
  };

  let orderShooping = [];
  shoppingItem.map((el, index) =>
    orderShooping.push(
      <>
        <div key={el._id}>
          <div>
            <div className="orders">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title>{el.name}</Card.Title>
                  <Card.Text>{el.price}</Card.Text>
                </Card.Body>
              </Card>
              <div className="orderCount">
                <Form.Group>
                  <Form.Text>{el.count}</Form.Text>
                </Form.Group>
              </div>
              <div>
                <p>{el.price}</p>
              </div>
              <div>
                <p>{el.count * el.price}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );

  return (
    <div>
      <div className="icons">
        <FaCartArrowDown size="30px" color="#566270" />
        <FaAngleLeft size="30px" color="#566270" />
        <FaRegCreditCard className="orders" size="30px" color="#6c49b8" />
        <FaAngleLeft size="30px" color="#566270" />
        <FaRegCheckCircle size="30px" color="#566270" />
      </div>
      <hr />
      <div className="named">
        <span>제품</span>
        <span>수량</span>
        <span>가격</span>
        <span>총금액</span>
      </div>
      <hr />
      <div>{orderShooping}</div>
      <hr />
      <div className="totalPrice">
        <p>총 금액</p>
        <p>60,000 원</p>
      </div>
      <hr />
      <hr />
      <div className="input_user">
        <h2 className="shipment">배송정보 입력</h2>
        <hr />
        <div className="shipping">
          <Form.Group className="ordr_input">
            <Form.Label>받으시는 분*</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="order_input">
            <Form.Label>핸드폰번호*</Form.Label>
            <div id="phone" className="mb-5">
              <Form.Control type="text" />
            </div>
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>이메일*</Form.Label>
            <div className="email">
              <Form.Control type="text" placeholder="" />
              <p>@</p>
              <Form.Control type="text" placeholder="gmail.com" />
            </div>
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>배송 메세지</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>주소</Form.Label>
            <div id="address_search">
              <Form.Control
                className="user_enroll_text"
                type="text"
                required={true}
                name="address"
                onChange={handleInput}
                value={enroll_company.address}
              />
              <button className="postBtn" onClick={handleComplete}>
                우편번호 찾기
              </button>
            </div>

            {popup && (
              <Post
                company={enroll_company}
                setcompany={setEnroll_company}
              ></Post>
            )}
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>나머지 주소*</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </div>
        <div className="last_order">
          <Button onClick={onClickComplete}>주문하기</Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
