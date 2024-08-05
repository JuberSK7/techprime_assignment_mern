import React from "react";
import { Navbar, Nav, Image, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authlogout } from "../redux/auth/authSlice";
// import dashboardactive from "../assets/Dashboard-active.svg";
// import dashboardicon from "../assets/Dashboard.svg";
// import projectlistactive from "../assets/Project-list-active.svg";
// import projectlist from "../assets/Project-list.svg";
// import createProjectactive from "../assets/create-project-active.svg";
// import createProject from "../assets/create-project.svg";
// import logouticon from "../assets/Logout.svg";

const CustomNavbar = () => {
  const dashboardactive = "/assets/Dashboard-active.png";
  const dashboardicon = "/assets/Dashboard.png";
  const projectlistactive = "/assets/Project-list-active.png";
  const projectlist = "/assets/Project-list.png";
  const createProjectactive = "/assets/create-project-active.png";
  const createProject = "/assets/create-project.png";
  const logouticon = "/assets/Logout.png";
  const location = useLocation();
  const isAuth = useSelector((store) => store.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authlogout());
    navigate("/login");
  };

  return (
    <>
      <Navbar
        bg="light"
        expand="md"
        className="d-none d-md-flex flex-column align-items-center justify-content-between shadow"
        style={{ width: "80px", height: "100vh" }}
      >
        <Nav className="flex-column w-100 justify-content-around d-flex align-items-center justify-content-center h-100">
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center h-100">
          <Nav.Link as={Link} to="/">
            <Image
              src={location.pathname === "/" ? dashboardactive : dashboardicon}
              alt="Dashboard"
              className="mb-4"
              fluid
            />
          </Nav.Link>
          <Nav.Link as={Link} to="/list" disabled={!isAuth}>
            <Image
              src={
                location.pathname === "/list" ? projectlistactive : projectlist
              }
              alt="List"
              className="mb-4"
              fluid
            />
          </Nav.Link>
          <Nav.Link as={Link} to="/add-project" disabled={!isAuth}>
            <Image
              src={
                location.pathname === "/add-project"
                  ? createProjectactive
                  : createProject
              }
              alt="Add Project"
              className="mb-4"
              fluid
            />
          </Nav.Link>
          </div>
          {isAuth && (
             <div className="w-100 d-flex justify-content-center">
            <Nav.Link onClick={handleLogout} className="">
              <Image src={logouticon} alt="logout" className="mb-4" />
            </Nav.Link>
            </div>
          )}
        </Nav>
      </Navbar>

      <Navbar
        bg="transparent"
        expand="md"
        fixed="bottom"
        className="d-flex d-md-none flex-row align-items-center justify-content-around shadow"
        style={{ width: "100%" }}
      >
        <Nav className="w-100 justify-content-around d-flex flex-row">
          <Nav.Link as={Link} to="/">
            <Image
              src={location.pathname === "/" ? dashboardactive : dashboardicon}
              alt="Dashboard"
            />
          </Nav.Link>
          <Nav.Link as={Link} to="/list" disabled={!isAuth}>
            <Image
              src={
                location.pathname === "/list" ? projectlistactive : projectlist
              }
              alt="List"
            />
          </Nav.Link>
          <Nav.Link as={Link} to="/add-project" disabled={!isAuth}>
            <Image
              src={
                location.pathname === "/add-project"
                  ? createProjectactive
                  : createProject
              }
              alt="Add Project"
            />
          </Nav.Link>
          {/* {isAuth && (
            <Nav.Link onClick={handleLogout}>
              <Image src={logouticon} alt="logout" />
            </Nav.Link>
          )} */}
        </Nav>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
