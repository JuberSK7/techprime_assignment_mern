import React from "react";
import Routess from "./routes/Routess";
import CustomNavbar from "./components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation} from "react-router-dom";
import "./App.css";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return (
    <div className="app-container">
      <div>
        {
          !isLoginPage &&     <CustomNavbar />
        }
    
      </div>
      <div className="routes_dashboard">
        {" "}
        <Routess />
      </div>

      {/* <Container fluid>
      <Row>
        <Col xs={2} className="p-0">
         
        </Col>
        <Col xs={10} className="p-0 scrollable-content">
        
        </Col>
      </Row>
    </Container> */}
    </div>
  );
}

export default App;
