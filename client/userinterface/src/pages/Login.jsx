import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
// import loginbg from '../assets/loginbg.svg';
// import Logo from "../assets/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const loginbg = "/assets/Header-bg.png";
  const Logo = "/assets/Logo.png";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isAuth = useSelector((store) => store.auth.isAuth);
  const message = useSelector((store) => store.auth.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (isValidEmail(email) && isValidPassword(password)) {
      console.log("email and password", email, password);
      dispatch(login({ email: email, password: password }));
    } else {
      setEmailError(!isValidEmail(email));
      setPasswordError(!isValidPassword(password));
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 5;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleForgotPassword = () => {
    alert('Please Contact to Admin !')
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  // console.log('password error',passwordError ? 'password is redqure' : "")
  return (
    <div
      style={{
        backgroundImage: `url(${loginbg})`,
        position: "absolute",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        // minHeight: '100vh',
        height: "60%",
        padding: "20px 40px",
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container className="d-flex flex-column align-items-center text-center mt-3 mb-3 ">
          <Image
            src={Logo}
            alt="logo"
            style={{ width: "100px", height: "100px" }}
          />
          <h2 className="text-white mt-2 login_project_name">
            Online Project Management
          </h2>
        </Container>
        <Container
          style={{
            width: "325px",
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            marginBottom: "100px",
          }}
          className="login_mobile"
        >
          <h6 className="text-center mb-4 login_started_heading">
            Login To Get Started
          </h6>

          <Form noValidate onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label
                className={`${
                  emailError ? "text-danger" : ""
                } login_email_name`}
              >
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={emailError}
                className="login_input_email"
              />
              {emailError && (
                <Form.Control.Feedback type="invalid" className="login_validation">
                  Email is required
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label
                className={`${
                  passwordError ? "text-danger" : ""
                } login_email_name`}
              >
                Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={passwordError}
                  className="login_input_password"
                />
                <InputGroup.Text
                  onClick={toggleShowPassword}
                  className="login_eye"
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>

{passwordError && (
                  <Form.Control.Feedback type="invalid" className="login_validation">
                    Password is required
                  </Form.Control.Feedback>
                )}

              
   
              </InputGroup>
              <p className="text-end login_forgot_pass" onClick={toggleForgotPassword}>Forgot password?</p>
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
              <Button
                className="login_btn"
                type="submit"
                style={{ borderRadius: "20px", width: "200px" }}
              >
                Login
              </Button>
            </div>

            {message && (
              <div className="d-flex justify-content-center mt-3">
                <Form.Text className="text-danger">{message}</Form.Text>
              </div>
            )}
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Login;
