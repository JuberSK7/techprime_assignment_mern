import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import CreateProject from '../components/CreateProject';
import { useDispatch } from 'react-redux';
import { authlogout } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

// import loginbg from '../assets/Header-bg.svg';
// import Logo from '../assets/Logo.svg';

const AddProjects = () => {
  const loginbg = '/assets/Header-bg.png';
  const Logo = '/assets/Logo.png';
  const logouticon = "/assets/Logout.svg";
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(authlogout());
    navigate('/login');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginbg})`,
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={6} md={6}>
            <h1 style={{ color: 'white', fontWeight: 'bold' }} className="dashboard_name">
              {'< Create Project'}
            </h1>
          </Col>
          <Col xs={6} md={6} className=" text-end text-center-md">
            <Image src={Logo} alt="logo" style={{ marginTop: '-15px', marginBottom: '15px' }}   className="d-none d-md-block"/>
            <Image onClick={handleLogout} src={logouticon} alt="logout" className='d-md-none'/>
          </Col>
        </Row>
        <Row className='align-items-center'>
          <Col md={11} className='create_project_mobile'>
            <CreateProject />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddProjects;
