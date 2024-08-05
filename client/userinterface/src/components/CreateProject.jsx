import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectCreateData } from "../redux/project/projectSlice";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";

const CreateProject = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Startdate: "",
    Enddate: "",
    Reason: "For Business",
    Type: "internal",
    Division: "Filters",
    Category: "Quality A",
    Priority: "High",
    Department: "Strategy",
    Location: "Pune",
    Projecttheme: "",
    Manager: "",
  });
  const [formValidation, setFormValidation] = useState({
    Projecttheme: false,
    Startdate: false,
    Enddate: false,
  });

  let message = useSelector((store) => store.project.massage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormValidation({
      ...formValidation,
      [e.target.name]: false,
    });
  };

  const handleInputStartDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Startdate: e.target.value,
    }));
    setFormValidation({
      ...formValidation,
      Enddate: false,
    });
  };

  const handleInputEndDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Enddate: e.target.value,
    }));
    setFormValidation({
      ...formValidation,
      Enddate: false,
    });
  };

  const handleSubmit = () => {
    const isProjectthemeValid = formData.Projecttheme !== "";
    const isStartdateValid = formData.Startdate !== "";
    const isEnddateValid = formData.Enddate !== "";

    setFormValidation({
      Projecttheme: !isProjectthemeValid,
      Startdate: !isStartdateValid,
      Enddate: !isEnddateValid,
    });

    if (isProjectthemeValid && isStartdateValid && isEnddateValid) {
      dispatch(ProjectCreateData(formData))
        .then((res) => {
          alert(res.payload.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill the required field first!");
    }
  };

  return (
    <Container className="mt-4 p-0">
      <Card className="p-4 shadow-sm project_form_main" >
        <Form>
          <Row className="mb-3 d-flex justify-content-between">
            <Col md={6}>
              <Form.Group controlId="projectTheme">
                <Form.Control
                  type="text"
                  placeholder="Enter Project Theme"
                  name="Projecttheme"
                  value={formData.Projecttheme}
                  onChange={handleInputChange}
                  isInvalid={formValidation.Projecttheme}
                  className="project_form_theme"
                />
                <Form.Control.Feedback type="invalid">
                  Project theme is required!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2} className="d-none d-md-block ">
              <Button
                onClick={handleSubmit}
                className="project_form_dashbord_savebtn"
              >
                Save Project
              </Button>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="reason">
                <Form.Label className="project_form_labels">Reason</Form.Label>
                <Form.Control
                  as="select"
                  name="Reason"
                  value={formData.Reason}
                  onChange={handleInputChange}
                  className="project_form_control"
                >
                  <option value="For Business">For Business</option>
                  <option value="Dealership">Dealership</option>
                  <option value="Transport">Transport</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="type">
                <Form.Label className="project_form_labels">Type</Form.Label>
                <Form.Control
                  as="select"
                  name="Type"
                  value={formData.Type}
                  onChange={handleInputChange}
                  className="project_form_control"
                >
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                  <option value="Vendor">Vendor</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="division">
                <Form.Label className="project_form_labels">
                  Division
                </Form.Label>
                <Form.Control
                  as="select"
                  name="Division"
                  value={formData.Division}
                  onChange={handleInputChange}
                  className="project_form_control"
                >
                  <option value="Filters">Filters</option>
                  <option value="Compressor">Compressor</option>
                  <option value="Pumps">Pumps</option>
                  <option value="Glass">Glass</option>
                  <option value="Water Heater">Water Heater</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="category">
                <Form.Label className="project_form_labels">
                  Category
                </Form.Label>
                <Form.Control
                  as="select"
                  name="Category"
                  value={formData.Category}
                  onChange={handleInputChange}
                  className="project_form_control"
                >
                  <option value="Quality A">Quality A</option>
                  <option value="Quality B">Quality B</option>
                  <option value="Quality C">Quality C</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="priority">
                <Form.Label className="project_form_labels">
                  Priority
                </Form.Label>
                <Form.Control
                  as="select"
                  name="Priority"
                  value={formData.Priority}
                  onChange={handleInputChange}
                  className="project_form_control"
                >
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="department">
                <Form.Label className="project_form_labels">
                  Department
                </Form.Label>
                <Form.Control
                  as="select"
                  name="Department"
                  value={formData.Department}
                  onChange={handleInputChange}
                  className="project_form_control"
                >
                  <option value="Strategy">Strategy</option>
                  <option value="Finance">Finance</option>
                  <option value="Quality">Quality</option>
                  <option value="Stores">Stores</option>
                  <option value="Maintenance">Maintenance</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="startDate">
                <Form.Label className="project_form_labels">
                  Start Date as per Project Plan
                </Form.Label>
                <Form.Control
                  type="date"
                  name="Startdate"
                  value={formData.Startdate}
                  onChange={handleInputStartDateChange}
                  isInvalid={formValidation.Startdate}
                  className="project_form_control"
                />
                <Form.Control.Feedback type="invalid">
                  StartDate is required!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="endDate">
                <Form.Label className="project_form_labels">
                  End Date as per Project Plan
                </Form.Label>
                <Form.Control
                  type="date"
                  name="Enddate"
                  value={formData.Enddate}
                  onChange={handleInputEndDateChange}
                  isInvalid={formValidation.Enddate}
                  className="project_form_control"
                />
                <Form.Control.Feedback type="invalid">
                  EndDate is required!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="location">
                <Form.Label className="project_form_labels">
                  Location
                </Form.Label>
                <Form.Control
                  as="select"
                  name="Location"
                  value={formData.Location}
                  onChange={handleInputChange}
                  className="project_form_control"
                >
                  <option value="Pune">Pune</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Bangluru">Bangluru</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          {/* 
          <Row className="mb-3"> */}

          {/* <Col md={6}>
              <Form.Group>
                <Form.Label>Manager Name </Form.Label>
                <Form.Control
                  name="Manager"
                  value={formData.Manager}
                  onChange={handleInputChange}
                ></Form.Control>
              </Form.Group>
            </Col> */}
          {/* </Row> */}

          <Row className="mb-3 d-flex align-items-end justify-content-end">
            <Col md={4} className="">
              <InputGroup className="me-2 d-flex align-items-center text-align-center">
                <Form.Label className="project_form_labels">Status:</Form.Label>
                <Form.Label className="project_form_register">
                  Registered
                </Form.Label>
              </InputGroup>
            </Col>
          </Row>

          <Row className="d-md-none">
            <Col md={2} className="">
              <Button onClick={handleSubmit}   className="project_form_dashbord_savebtn">
                Save Project
              </Button>
            </Col>
          </Row>
        </Form>

        {message && (
          <Row className="mt-2">
            <Col md={12}>
              <p className="text-danger">{message}</p>
            </Col>
          </Row>
        )}
      </Card>
    </Container>
  );
};

export default CreateProject;
