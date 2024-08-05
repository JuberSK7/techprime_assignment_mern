import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image, Alert } from "react-bootstrap";
// import loginbg from "../assets/Header-bg.svg";
// import Logo from "../assets/Logo.svg";
import { useDispatch } from "react-redux";
import { GetProjectInfo } from "../redux/project/projectSlice";
import Chart from "../components/Chart";
import { authlogout } from "../redux/auth/authSlice";

const Dashboard = () => {
  const loginbg = "/assets/Header-bg.png";
  const logouticon = "/assets/Logout.svg";
  const Logo = "/assets/Logo.png";
  const [info, setInfo] = useState({});
  console.log("info", info);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authlogout());
    navigate('/login');
  };

  useEffect(() => {
    dispatch(GetProjectInfo())
      .then((res) => setInfo(res.payload))
      .catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundRepeat: "no-repeat",
        // maxWidth:'94vw',
        width: "100%",
        padding: "20px",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Row className="justify-content-between align-items-center mb-3">
        <Col xs="auto">
          <h2
            style={{ color: "white", fontWeight: "bold" }}
            className="dashboard_name"
          >
            Dashboard
          </h2>
        </Col>
        <Col xs="auto">
          <Image
            src={Logo}
            alt="logo"
            fluid
            style={{ marginTop: "-15px", marginBottom: "15px" }}
            className="d-none d-md-block"
          />
        </Col>
        <Col xs="auto">
          <Image onClick={handleLogout} src={logouticon} alt="logout" />
        </Col>
      </Row>

      <Row className="gx-4 dashboard_scroll" style={{ display: "flex" }}>
        <Col md={2} sm={6} className="mb-3">
          <Card
            className="dashboard_project_card"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }}
          >
            <Card.Body>
              <Card.Title
                className="text-muted dashboard_totalProject"
                style={{ fontSize: "15px" }}
              >
                Total Projects
              </Card.Title>
              <Card.Text
                style={{ fontWeight: "bold", fontSize: "20px" }}
                className="dashboard_totalProject_count"
              >
                {info?.total}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={2} sm={6} className="mb-3">
          <Card
            className="dashboard_project_card"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }}
          >
            <Card.Body>
              <Card.Title
                className="text-muted dashboard_totalProject"
                style={{ fontSize: "15px" }}
              >
                Closed
              </Card.Title>
              <Card.Text
                style={{ fontWeight: "bold", fontSize: "20px" }}
                className="dashboard_totalProject_count"
              >
                {info?.closed}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={2} sm={6} className="mb-3">
          <Card
            className="dashboard_project_card"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }}
          >
            <Card.Body>
              <Card.Title
                className="text-muted dashboard_totalProject"
                style={{ fontSize: "15px" }}
              >
                Running
              </Card.Title>
              <Card.Text
                style={{ fontWeight: "bold", fontSize: "20px" }}
                className="dashboard_totalProject_count"
              >
                {info?.running}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={2} sm={6} className="mb-3">
          <Card
            className="dashboard_project_card"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }}
          >
            <Card.Body>
              <Card.Title
                className="text-muted dashboard_totalProject"
                style={{ fontSize: "15px" }}
              >
                Closure Delay
              </Card.Title>
              <Card.Text
                style={{ fontWeight: "bold", fontSize: "20px" }}
                className="dashboard_totalProject_count"
              >
                {info?.delayedRunning}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={2} sm={6} className="mb-3">
          <Card
            className="dashboard_project_card"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }}
          >
            <Card.Body>
              <Card.Title
                className="text-muted dashboard_totalProject"
                style={{ fontSize: "15px" }}
              >
                Canceled
              </Card.Title>
              <Card.Text
                style={{ fontWeight: "bold", fontSize: "20px" }}
                className="dashboard_totalProject_count"
              >
                {info?.cancel}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Col style={{ width: "100%" }}>
          {/* <Card
            className="mt-4"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
              width: "100%",
            }}
          > */}
          {/* <Card.Body style={{ width: "100%" }}> */}

          <Chart />

          {/* </Card.Body> */}
          {/* </Card> */}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
