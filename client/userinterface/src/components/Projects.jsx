import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProject, UpdateProject } from "../redux/project/projectSlice";
import Pegination from "./Pegination";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [field, setField] = useState("");
  const [screensize, setScreensize] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const currentdata = useSelector((store) => store.project.data);
  const totalPage = useSelector((store) => store.project.totalPage);
  const isLoading = useSelector((store) => store.project.loading);

  console.log("curent data", currentdata);
  console.log(" all data", data);


  const handleSortList = (event) => {
    setField(event.target.value);
  };

  const sortlist = [
    "Priority",
    "Projecttheme",
    "Reason",
    "Type",
    "Division",
    "Category",
    "Department",
    "Startdate",
    "Enddate",
    "LocationL",
    "Status",
  ];
  console.log("search-", searchTerm, "page-", page, "field-", field);

  useEffect(() => {
    dispatch(GetProject({ query: searchTerm, page, field }));
  }, [dispatch, searchTerm, page, field]);

  useEffect(() => {
    if (currentdata.length > 0) {
      setData(currentdata);
    }
  }, [currentdata]);

  let timer = null;

  // useEffect(() => {
  //   clearTimeout(timer);

  //   if (searchTerm !== "") {
  //     timer = setTimeout(() => {
  //       setPage(1);
  //       dispatch(GetProject({ query: searchTerm, page, field }));
  //     }, 5000);
  //   } else {
  //     dispatch(GetProject({ query: searchTerm, page, field }));
  //   }

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [searchTerm, page, field, dispatch]);
  useEffect(() => {
    const handleSearch = () => {
      if (searchTerm !== "") {
        timer = setTimeout(() => {
          setPage(1);
          dispatch(GetProject({ query: searchTerm, page: 1, field }));
        }, 500);
      } else {
        dispatch(GetProject({ query: searchTerm, page, field }));
      }
    };

    handleSearch();

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, field, dispatch]);

  const handleClose = (id) => {
    let url = `/statusclose/${id}`;
    dispatch(UpdateProject(url)).then((res) => {
      if (res) {
        dispatch(GetProject({ query: searchTerm, page, field }));
      }
    });
  };

  const handleStart = (id) => {
    let url = `/statusrun/${id}`;
    dispatch(UpdateProject(url)).then((res) => {
      if (res) {
        dispatch(GetProject({ query: searchTerm, page, field }));
      }
    });
  };

  const handleCancel = (id) => {
    let url = `/statuscancel/${id}`;
    dispatch(UpdateProject(url)).then((res) => {
      if (res) {
        dispatch(GetProject({ query: searchTerm, page, field }));
      }
    });
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreensize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container fluid className="projects-container">
      <Row className="justify-content-center">
        <Col xs={12} md={12}>
          <div className="projects-header p-3 mb-2 bg-white rounded shadow-sm">
            <Row className="align-items-center">
              <Col xs={12} md={4}>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col xs={12} md={4} className="text-center">
                {isLoading && <span>Loading...</span>}
              </Col>
              <Col xs={12} md={4}>
                <Form.Select value={field} onChange={handleSortList}>
                  {sortlist.map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {screensize >= 1024 ? (
        <Table responsive className="projects-table">
          <thead className="table_head">
            <tr className="project_table_heading">
              <th>Project Name</th>
              <th>Reason</th>
              <th>Type</th>
              <th>Division</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Dept</th>
              {/* <th>Manager</th> */}
              <th>Location</th>
              <th>Status</th>
              <th></th>
              {/* <th></th>
              <th></th> */}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="projectlist_name">{item.Projecttheme}</div>
                    <small className="projectlist_date">
                      {item.Startdate} to {item.Enddate}
                    </small>
                  </td>
                  <td className="projectlist_data">{item.Reason}</td>
                  <td className="projectlist_data">{item.Type}</td>
                  <td className="projectlist_data">{item.Division}</td>
                  <td className="projectlist_data">{item.Category}</td>
                  <td className="projectlist_data">{item.Priority}</td>

                  <td className="projectlist_data">{item.Department}</td>
                  {/* <td>{item.Manager}</td> */}
                  <td className="projectlist_data">{item.Location}</td>
                  <td className="projectlist_data">{item.Status}</td>
                  <td>
                    <Button
                      className="m-1 project_list_start_btn "
                      size="sm"
                      onClick={() => handleStart(item._id)}
                    >
                      Start
                    </Button>
                    <Button
                      className="m-1 project_list_close_btn"
                      size="sm"
                      onClick={() => handleClose(item._id)}
                    >
                      Close
                    </Button>
                    <Button
                      className="m-1 project_list_canc_btn"
                      size="sm"
                      onClick={() => handleCancel(item._id)}
                    >
                      Cancel
                    </Button>
                  </td>
                  {/* <td>
                
                </td>
                <td>

                </td> */}
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <Row className="gy-4">
          {data.length > 0 &&
            data.map((item) => (
              <Col xs={12} key={item._id}>
                <div className="project-card p-3 bg-white rounded shadow-sm">
                  <div className="d-flex justify-content-between">
                    <div> 
                      <h6>{item.Projecttheme}</h6>
                      <small className="text-muted">
                        {item.Startdate} to {item.Enddate}
                      </small>
                    </div>
                    <strong>{item.Status}</strong>
                  </div>
                  <div className="mt-3">
                    <p className="mb-1 projectlist_data">
                      <strong>Reason:</strong> {item.Reason}
                    </p>
                    <div className="d-flex">
                      <p className="mb-1 projectlist_data me-4">
                        <strong>Type:</strong> {item.Type}
                      </p>
                      <p className="mb-1 projectlist_data projectlist_data_seprate ">
                        <strong>Category:</strong> {item.Category}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="mb-1 projectlist_data me-4">
                        <strong>Division:</strong> {item.Division}
                      </p>
                      <p className="mb-1 projectlist_data projectlist_data_seprate">
                        <strong>Dept:</strong> {item.Department}
                      </p>
                    </div>

                    <p className="mb-1 projectlist_data">
                      <strong>Location:</strong> {item.Location}
                    </p>
                    <p className="mb-1 projectlist_data">
                      <strong>Priority:</strong> {item.Priority}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <Button
                      size="sm"
                      onClick={() => handleStart(item._id)}
                      className="me-2 project_list_start_btn"
                    >
                      Start
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleClose(item._id)}
                      className="me-2 project_list_close_btn"
                    >
                      Close
                    </Button>
                    <Button
                      className="project_list_canc_btn"
                      size="sm"
                      onClick={() => handleCancel(item._id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      )}

      <Row className="justify-content-center mt-4">
        <Col xs={12} className="d-flex justify-content-center">
          <Pegination
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={totalPage}
            setPage={setPage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Projects;
