import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
// import loginbg from '../assets/Header-bg.svg';
// import Logo from '../assets/Logo.svg';
import Projects from '../components/Projects';
import { useDispatch } from 'react-redux';
import { authlogout } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';


const ProjectsList = () => {
  const loginbg =  '/assets/Header-bg.png';
  const Logo =  '/assets/Logo.png';
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
        padding: '20px 40px 20px 20px',
        display: 'flex',
        flexDirection: 'column',
      }}
      className='projects_lists'
    >
      <Container fluid>
        <Row className='d-flex justify-content-between align-items-center w-100 project_list_mobile'>
          <Col xs='auto' md={4}>
            <Button
              variant="link"
              style={{
                color: 'white',
                textAlign: 'left',
                fontSize: '20px',
                fontWeight: 'bold',
                paddingLeft: 0,
                textDecoration: 'none'
              }}
            >
              {'< Create Project'}
            </Button>
          </Col>

          <Col xs='auto' md={4} className="d-flex justify-content-center">
            <Image src={Logo} alt="logo" style={{ marginTop: '-15px', marginBottom: '15px' }} className='d-none d-md-block' />
            <Image onClick={handleLogout} src={logouticon} alt="logout" className='d-md-none'/>
          </Col>
        <Col md={4}></Col>
        </Row>
      </Container>
      <Projects />
    </div>
  );
};

export default ProjectsList;
