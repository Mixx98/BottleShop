import { React, useEffect, useState } from "react";
import {
  Card,
  Nav,
  Button,
  Form,
  InputGroup,
  Pagination,
  ListGroup,
} from "react-bootstrap";
import LOUISLATOURSANTENAY from "../images/red wine/LOUIS LATOUR SANTENAY.png";
import axios from "axios";

const api = require("../../API.json");

const WineList = () => {
  // get 데이터 불러오기
  const [dataList, setDataList] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(api.product);
    setDataList(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitHandler = async (element) => {
    element.preventDefault();
    const name = element.target.name.value;
    const type = element.target.type.value;
    const price = element.target.price.value;
    const description = element.target.description.value;
    const wine_type = element.target.wine_type.value;
    const origin = element.target.origin.value;
    const abv = element.target.abv.value;
    const image_path = element.target.image_path.value;

    await axios.post(api.product, {
      name,
      type,
      price,
      description,
      wine_type,
      origin,
      abv,
      image_path,
    });
    fetchData();
  };

  // 페이지 수를 정해주는거
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const popup = () => console.log("구현중");

  // 리스트 구현
  let Name = [];
  {
    dataList?.map((data, num) =>
      Name.push(
        <Card key={num} action onClick={popup}>
          {data.name}
        </Card>
      )
    );
  }

  let Price = [];
  {
    dataList?.map((data, num) =>
      Price.push(
        <ListGroup.Item key={num} action onClick={popup}>
          {data.price}
        </ListGroup.Item>
      )
    );
  }

  return (
    <>
      {/* 네비게이션 바 */}
      <Nav id="nav_bar" variant="tabs" defaultActiveKey="/admin/product">
        <Nav.Item>
          <Nav.Link href="/admin/product">Product</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Product 페이지 */}
      <form onSubmit={onSubmitHandler}>
        {/* 상단바 */}
        <div class="product_bar">
          <h2>Product</h2>
          <InputGroup id="product_manager" size="sm" className="mb-2">
            <Form.Control id="product_searchbar" />
            <Button id="button">조회</Button>
            <Button id="button">저장</Button>
            <Button id="button">삭제</Button>
            <Button id="button" type="submit">
              추가
            </Button>
          </InputGroup>
        </div>

        {/* DB입력 부분 */}
        <div class="product_DB">
          <Form.Group className="mb-1">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="String" />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type">
              <option></option>
              <option value="Wine">Wine</option>
              <option value="Cheese">Cheese</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Price</Form.Label>
            <Form.Control name="price" type="text" placeholder="Number" />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Description</Form.Label>
            <Form.Control name="description" type="text" placeholder="String" />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Wine_type</Form.Label>
            <Form.Select name="wine_type">
              <option></option>
              <option value="Red_Wine">Red</option>
              <option value="White_Wine">White</option>
              <option value="Sparkling">Sparkling</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Origin</Form.Label>
            <Form.Control name="origin" type="text" placeholder="String" />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Abv</Form.Label>
            <Form.Control name="abv" type="text" placeholder="Number" />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Image_path</Form.Label>
            <Form.Control name="image_path" type="text" placeholder="String" />
          </Form.Group>
        </div>
      </form>

      {/* 리스트 */}
      <div id="product_list">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={LOUISLATOURSANTENAY} />
          <Card.Body>
            <Card.Title>{Name}</Card.Title>
            <Card.Text>{Price}</Card.Text>
            <button type="button" class="btn btn-outline-info">
              장바구니
            </button>
          </Card.Body>
        </Card>

        <Pagination id="page" size="sm">
          {items}
        </Pagination>
      </div>
    </>
  );
};

export default WineList;
