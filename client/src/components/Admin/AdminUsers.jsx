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

const AdminUsers = () => {
  adminPermission.default();
  axios.defaults.withCredentials = true; // withCredentials 전역 설정
  // Element 제어
  let inputSearchBar = useRef(null);
  let inputUserName = useRef(null);
  let inputDomain = useRef(null);
  let inputPassword = useRef(null);
  let inputName = useRef(null);
  let inputPhone = useRef(null);
  let inputBirthday = useRef(null);
  let inputAuthEmail = useRef(null);

  // [GET] 데이터 불러오기
  const [dataList, setDataList] = useState(null);

  const getDate = async () => {
    const response = await axios.get(api.users_GET);
    setDataList(response.data);
  };

  useEffect(() => {
    getDate();
  }, []);

  // 입력칸 리셋
  const reSet = () => {
    inputSearchBar = "";
    inputUserName.current.value = "";
    inputDomain.current.value = null;
    inputPassword.current.value = "";
    inputName.current.value = "";
    inputPhone.current.value = "";
    inputBirthday.current.value = "";
    inputAuthEmail.current.value = null;
  };

  // [POST] 데이터 전송하기
  const handlePostButtonClick = async () => {
    const username = inputUserName.current.value;
    const domain = inputDomain.current.value;
    const password = inputPassword.current.value;
    const name = inputName.current.value;
    const phone = inputPhone.current.value;
    const birthday = inputBirthday.current.value;

    // 이름 중복 방지
    let overlap = false;
    for (let data of dataList) {
      if (data.username === username) {
        alert("이름이 중복됩니다");
        overlap = true;
      }
    }

    if (!overlap) {
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
          console.log(response);
          if (response.status === 200) {
            alert(response.data);
            getDate(); // 리스트 새로고침
            reSet(); // 입력칸 리셋
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  // [DELETE] ID로 선택된 데이터 삭제
  const handleDeleteButtonClick = async () => {
    const username = inputUserName.current.value;

    await axios
      .delete(api.users_DELETE + username)
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
    const username = inputUserName.current.value;
    const password = inputPassword.current.value;
    const name = inputName.current.value;
    const phone = inputPhone.current.value;
    const birthday = inputBirthday.current.value;

    await axios
      .put(api.users_PUT + username, {
        name,
        phone,
        birthday,
      })
      .catch((err) => {
        alert(err.message);
      });

    await axios
      .put(api.users_PUT + username, {
        password,
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
    inputUserName.current.value = data.username;
    inputDomain.current.value = data.domain;
    inputPassword.current.value = data.password;
    inputName.current.value = data.name;
    inputPhone.current.value = data.phone;
    inputBirthday.current.value = data.birthday;
    inputAuthEmail.current.value = data.auth_email;
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
          <td>{data.username}</td>
        </tr>
      );
    }
  });

  // 조회 기능
  const handleSearchButtonClick = () => {
    const searchValue = inputSearchBar.current.value;
    let success = false;

    for (let data of dataList) {
      if (data.username === searchValue) {
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
      <Nav id="nav_bar" variant="tabs" defaultActiveKey="/admin/users">
        {adminList.map((data) => (
          <Nav.Item key={data.name}>
            <Nav.Link href={data.href}>{data.name}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* 상단바 */}
      <div class="DB_bar">
        <h2>Users</h2>
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
          <Button id="button" onClick={handlePostButtonClick}>
            추가
          </Button>
        </InputGroup>
      </div>

      {/* DB입력 부분 */}
      <div class="DB_data">
        <Form.Group className="mb-1">
          <Form.Label>User_Name</Form.Label>
          <Form.Control ref={inputUserName} type="text" placeholder="String" />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Domain</Form.Label>
          <Form.Select ref={inputDomain}>
            <option></option>
            {domainSelect}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={inputPassword} type="text" placeholder="String" />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Name</Form.Label>
          <Form.Control ref={inputName} type="text" placeholder="String" />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Phone</Form.Label>
          <Form.Control ref={inputPhone} type="phone" placeholder="Number" />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Birthday</Form.Label>
          <Form.Control ref={inputBirthday} type="date" />
        </Form.Group>

        {/* <Form.Group className="mb-1">
          <Form.Label>Auth_email</Form.Label>
          <Form.Select ref={inputAuthEmail}>
            <option></option>
            <option key="true" value="true">
              True
            </option>
            <option key="false" value="false">
              False
            </option>
          </Form.Select>
        </Form.Group> */}
      </div>

      {/* 리스트 */}
      <div>
        <Table striped bordered hover size="sm" id="DB_list">
          <thead>
            <tr>
              <th>ID</th>
              <th>User_Name</th>
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
export default AdminUsers;
