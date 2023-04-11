import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import LOUISLATOURSANTENAY from "../images/red wine/LOUIS LATOUR SANTENAY.png";
import GALANTAS from "../images/red wine/GALANTAS.png";
import SANTACRISTINABRUT from "../images/sparklingwine/SANTA CRISTINA BRUT.png";
import ARRASBLANCDEBLANCNV from "../images/sparklingwine/ARRAS BLANC DE BLANC NV.png";
import CHATEAUBONNETWHITE from "../images/white wine/CHATEAU BONNET WHITE.png";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function BestWine() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="Best_wine">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={LOUISLATOURSANTENAY} onClick={setShow} />
          <Card.Body>
            <Card.Title onClick={setShow}>LOUIS LATOUR SANTENAY</Card.Title>
            <Card.Text>75,000원</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={GALANTAS} />
          <Card.Body>
            <Card.Title>GALANTAS</Card.Title>
            <Card.Text>75,000원</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={SANTACRISTINABRUT} />
          <Card.Body>
            <Card.Title>SANTA CRISTINA BRUT</Card.Title>
            <Card.Text>33,000원</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={ARRASBLANCDEBLANCNV} />
          <Card.Body>
            <Card.Title>ARRASBLANCDEBLANCNV </Card.Title>
            <Card.Text>52,000원</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={CHATEAUBONNETWHITE} />
          <Card.Body>
            <Card.Title>CHATEAU BONNET WHITE</Card.Title>
            <Card.Text>65,000원</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default BestWine;
