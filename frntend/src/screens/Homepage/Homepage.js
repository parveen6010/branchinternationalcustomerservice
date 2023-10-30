import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Homepage.css";

function HomePage() {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
          <h1 className="title">Welcome to Branch International</h1>
            </div>
            <div className="buttonContainer">
            <h1 className="landingbutton" style={{ fontSize: "20px", padding:"15px", backgroundColor:"white"  }}>Customer Service</h1>
              <Link to="/login">
                <Button size="lg" className="landingbutton" >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </Row>
        <Row>
          <div className="intro-text">
            <div className="buttonContainer">
            <h1 className="landingbutton" style={{ fontSize: "20px", padding:"15px", backgroundColor:"white" }}>Agents Service</h1>
              <Link to="/agentlogin">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/agentregister">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;

