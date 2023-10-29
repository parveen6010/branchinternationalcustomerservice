import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Screen.css";

function agentMainScreen({ children, customername }) {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <div className="page">
            {customername && (
              <>
                <h1 className="heading">{customername}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default agentMainScreen;
