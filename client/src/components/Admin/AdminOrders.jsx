import React, { useEffect, useState, useRef } from "react";
import "./Admin.css";
import axios from "axios";

import {
  Nav,
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
} from "react-bootstrap";

// json 연결
const api = require("../../api.json"); // API 불러오기
const adminList = require("./adminList.json"); // Admin 리스트 불러오기
const domainList = require("../../domainList.json"); // Domain 리스트 불러오기
const adminPermission = require("./adminPermission.js");

const AdminOrders = () => {
  adminPermission.default();
  axios.defaults.withCredentials = true; // withCredentials 전역 설정
  // Element 제어
  let inputSearchBar = useRef(null);
  let inputUserId = useRef(null);
  let inputGuestId = useRef(null);
  let inputShipmentId = useRef(null);
  let inputStatus = useRef(null);

  // [GET] 데이터 불러오기
  const [dataList, setDataList] = useState(null);
  const [shipmentList, setShipmentList] = useState(null);

  const getDate = async () => {
    const response = await axios.get(api.orders_GET);
    setDataList(response.data);
  };

  const getShipmentList = async () => {
    const response = await axios.get(api.shipment_GET);
    setShipmentList(response.data);
  };

  useEffect(() => {
    getDate();
    getShipmentList();
  }, []);

  // 입력칸 리셋
  const reSet = () => {
    inputSearchBar = "";
    inputUserId.current.value = "";
    inputGuestId.current.value = "";
    inputStatus.current.value = "";
  };

  // [DELETE] ID로 선택된 데이터 삭제
  const handleDeleteButtonClick = async () => {
    const id = inputSearchBar.current.value;

    await axios
      .delete(api.oders_DELETE + id)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          getDate(); // 리스트 새로고침
          reSet(); // 입력칸 리셋
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // [PUT] ID로 선택된 데이터 수정
  const handlePutButtonClick = async () => {
    const status = inputStatus.current.value;
    const id = inputShipmentId.current.value;

    await axios
      .put(api.shipments_PUT + "status/" + id, {
        status,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          getDate(); // 리스트 새로고침
          reSet(); // 입력칸 리셋
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Domain List 만들기
  const domainSelect = [];
  domainList.forEach((data) => {
    domainSelect.push(
      <option key={data.name} value={data.name}>
        {data.name}
      </option>
    );
  });

  // 페이지 넘버 만들기
  const row = 5; // 한 페이지에 넣을 개수
  const dataListLength = dataList?.length;
  const pageNumber =
    dataListLength % row === 0
      ? parseInt(dataListLength / row) - 1
      : parseInt(dataListLength / row);
  let setPageNumber = [];
  const [active, setActive] = useState(1);
  const handlePageClick = (number) => setActive(number);

  for (let number = 1; number <= pageNumber + 1; number++) {
    setPageNumber.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          handlePageClick(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  // 데이터를 입력하면 입력폼에 표시하는 코드
  const setInput = (data) => {
    inputSearchBar.current.value = data._id;
    inputUserId.current.value = data.user_id["username"];
    inputGuestId.current.value = data.guest_id;
    shipmentList.map((shipmentData) => {
      if (shipmentData.order_id === data._id) {
        inputShipmentId.current.value = shipmentData._id;
        inputStatus.current.value = shipmentData.status;
      }
    });
  };

  // 리스트 구현
  let setList = [];
  dataList?.forEach((data, index) => {
    if (row * (active - 1) <= index && index < row * active) {
      setList.push(
        <tr
          key={data._id}
          onClick={() => {
            setInput(data);
          }}
        >
          <td>{data._id}</td>
          <td>{data.user_id["username"]}</td>
          <td>{data.guest_id}</td>
        </tr>
      );
    }
  });

  // 조회 기능
  const handleSearchButtonClick = () => {
    const searchValue = inputSearchBar.current.value;
    let success = false;

    for (let data of dataList) {
      if (data._id === searchValue) {
        setInput(data);
        success = true;
        break;
      }
    }
    if (!success) alert("일치하는 데이터가 없습니다.");
  };

  return (
    <>
      {/* 네비게이션 바 */}
      <Nav id="nav_bar" variant="tabs" defaultActiveKey="/admin/orders">
        {adminList.map((data) => (
          <Nav.Item key={data.name}>
            <Nav.Link href={data.href}>{data.name}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* 상단바 */}
      <div class="DB_bar">
        <h2>Orders</h2>
        <InputGroup id="DB_manager" size="sm" className="mb-2">
          <Form.Control
            ref={inputSearchBar}
            id="DB_searchbar"
            placeholder="ID"
          />
          <Button id="button" onClick={handleSearchButtonClick}>
            조회
          </Button>
          <Button id="button" onClick={handlePutButtonClick}>
            저장
          </Button>
          <Button id="button" onClick={handleDeleteButtonClick}>
            삭제
          </Button>
        </InputGroup>
      </div>

      {/* DB입력 부분 */}
      <div class="DB_data">
        <Form.Group className="mb-1">
          <Form.Label>User_ID</Form.Label>
          <Form.Control ref={inputUserId} type="text" placeholder="String" />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Guest_ID</Form.Label>
          <Form.Control ref={inputGuestId} type="text" placeholder="String" />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Status</Form.Label>
          <Form.Select ref={inputStatus}>
            <option></option>
            <option value="배송전">배송전</option>
            <option value="배송중">배송중</option>
            <option value="배송완료">배송완료</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Shipment_ID</Form.Label>
          <Form.Control
            ref={inputShipmentId}
            type="text"
            placeholder="String"
          />
        </Form.Group>
      </div>

      {/* 리스트 */}
      <div>
        <Table striped bordered hover size="sm" id="DB_list">
          <thead>
            <tr>
              <th>_ID</th>
              <th>User_ID</th>
              <th>Guest_ID</th>
            </tr>
          </thead>
          <tbody>{setList}</tbody>
        </Table>
        <Pagination id="page" size="sm">
          {setPageNumber}
        </Pagination>
      </div>
    </>
  );
};
export default AdminOrders;
