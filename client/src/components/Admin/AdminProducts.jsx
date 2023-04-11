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

// 가져오기
const api = require("../../api.json"); // API 불러오기
const adminList = require("./adminList.json"); // Admin 리스트 불러오기
const adminPermission = require("./adminPermission.js");

const AdminProducts = () => {
  adminPermission.default();

  // Element 제어
  let inputSearchBar = useRef(null);
  let inputName = useRef(null);
  let inputType = useRef(null);
  let inputPrice = useRef(null);
  let inputDescription = useRef(null);
  let inputWineType = useRef(null);
  let inputOrigin = useRef(null);
  let inputAbv = useRef(null);
  let inputImage = useRef(null);

  // [GET] 데이터 불러오기
  const [dataList, setDataList] = useState(null);

  const getDate = async () => {
    const response = await axios.get(api.products_GET);
    setDataList(response.data);
  };

  // [GET] 카테고리 리스트 불러오기
  const [categoriesList, setCategoriesList] = useState(null);

  const getCategoriesList = async () => {
    const response = await axios.get(api.categories_GET);
    setCategoriesList(response.data);
  };

  useEffect(() => {
    getDate();
    getCategoriesList();
  }, []);

  // 입력칸 리셋
  const reSet = () => {
    inputSearchBar.current.value = "";
    inputName.current.value = "";
    inputType.current.value = null;
    inputPrice.current.value = "";
    inputDescription.current.value = "";
    inputWineType.current.value = null;
    inputOrigin.current.value = "";
    inputAbv.current.value = "";
    inputImage.current.value = "";
  };

  const [productFormData, setproductFormData] = useState(null);

  const handletest = (e) => {
    let formData = new FormData();

    formData.append("type", inputType.current.value);
    formData.append("name", inputName.current.value);
    formData.append("price", inputPrice.current.value);
    formData.append("description", inputDescription.current.value);
    formData.append("wine_type", inputWineType.current.value);
    formData.append("origin", inputOrigin.current.value);
    formData.append("abv", inputAbv.current.value);
    formData.append("image", e.target.files[0]);

    console.log(e.target.files[0]);
    setproductFormData(formData);

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
  };

  // [POST] 데이터 전송하기
  const handlePostButtonClick = async () => {
    // Element 값

    const name = inputName.current.value;
    let formData = new FormData();

    formData.append("type", inputType.current.value);
    formData.append("name", inputName.current.value);
    formData.append("price", inputPrice.current.value);
    formData.append("description", inputDescription.current.value);
    formData.append("wine_type", inputWineType.current.value);
    formData.append("origin", inputOrigin.current.value);
    formData.append("abv", inputAbv.current.value);
    formData.append("image", inputImage.current.files[0]);

    // 이름 중복 방지
    let overlap = false;
    for (let data of dataList) {
      if (data.name === name) {
        alert("이름이 중복됩니다");
        overlap = true;
      }
    }

    for (const pair of formData.entries()) {
      console.log(pair[1]);
    }

    if (!overlap) {
      await axios
        .post(api.products_POST, formData, {
          headers: { "Content-Type": "multipart/form-data" },
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
    }
  };

  // [DELETE] ID로 선택된 데이터 삭제
  const handleDeleteButtonClick = async () => {
    const id = inputSearchBar.current.value;

    await axios
      .delete(api.products_DELETE + id)
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
    // Element 값
    const id = inputSearchBar.current.value;
    const name = inputName.current.value;
    const type = inputType.current.value;
    const price = inputPrice.current.value;
    const description = inputDescription.current.value;
    const wine_type = inputWineType.current.value;
    const origin = inputOrigin.current.value;
    const abv = inputAbv.current.value;
    const image = inputImage.current.value;

    // 이름 중복 방지
    let overlap = false;
    // for (let data of dataList) {
    //   if (data._id !== id) {
    //     // 다른 이름으로 변경할 경우 중복 체크
    //     if (data.name === name) {
    //       alert("이름이 중복됩니다");
    //       overlap = true;
    //     }
    //   }
    // }

    if (!overlap) {
      await axios
        .put(api.products_PUT + id, {
          name,
          type,
          price,
          description,
          wine_type,
          origin,
          abv,
          image,
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
    }
  };

  // Type 리스트 만들기
  const typeList = [];
  categoriesList?.forEach((data) => {
    typeList.push(
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
    inputName.current.value = data.name;
    inputType.current.value = data.type;
    inputPrice.current.value = data.price;
    inputDescription.current.value = data.description;
    inputWineType.current.value = data.wine_type;
    inputOrigin.current.value = data.origin;
    inputAbv.current.value = data.abv;
    inputImage.current.value = data.image;
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
          <td>{data.name}</td>
        </tr>
      );
    }
  });

  // 조회 기능
  const handleSearchButtonClick = () => {
    const id = inputSearchBar.current.value;
    let success = false;
    for (let data of dataList) {
      if (data._id === id) {
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
      <Nav id="nav_bar" variant="tabs" defaultActiveKey="/admin/products">
        {adminList.map((data) => (
          <Nav.Item key={data.name}>
            <Nav.Link href={data.href}>{data.name}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* 상단바 */}
      <div class="DB_bar">
        <h2>Products</h2>
        <InputGroup id="DB_manager" size="sm">
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
          <Form.Label>Name</Form.Label>
          <Form.Control ref={inputName} type="text" placeholder="String" />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Type</Form.Label>
          <Form.Select ref={inputType}>
            <option></option>
            {typeList}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Price</Form.Label>
          <Form.Control ref={inputPrice} type="text" placeholder="Number" />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            ref={inputDescription}
            type="text"
            placeholder="String"
          />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Wine_type</Form.Label>
          <Form.Select ref={inputWineType}>
            <option></option>
            <option value="Red">Red</option>
            <option value="White">White</option>
            <option value="Sparkling">Sparkling</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Origin</Form.Label>
          <Form.Control ref={inputOrigin} type="text" placeholder="String" />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Abv</Form.Label>
          <Form.Control ref={inputAbv} type="text" placeholder="Number" />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Image</Form.Label>

          <Form.Control
            ref={inputImage}
            encType="multipart/form-data"
            type="file"
            name="image"
            // accept="image/*"
            // onChange={handletest}
          />
        </Form.Group>
      </div>

      {/* 리스트 */}
      <div>
        <Table striped bordered hover size="sm" id="DB_list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
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
export default AdminProducts;
