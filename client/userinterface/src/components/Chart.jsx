import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetDashboardChart } from "../redux/project/projectSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Container, Row, Col, Card } from "react-bootstrap";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "",
    },
  },
};

var labels;

const Chart = () => {
  const [data, setData] = useState([]);
 console.log('data', data)
  labels = data.map((el) => el.department.slice(0, 5));
 

  let chartdata = {
    labels,
    datasets: [
      {
        label: "Total",
        data: data.map((el) => el.registeredCount),
        backgroundColor: "blue",
        borderRadius: { topLeft: 12, topRight: 12, bottomLeft: 0, bottomRight: 0 },
        barThickness: 10,
     
        
      },
      {
        label: "Closed",
        data: data.map((el) => el.closedCount),
        backgroundColor: "green",
        borderRadius: { topLeft: 12, topRight: 12, bottomLeft: 0, bottomRight: 0 },
        barThickness: 10,
     
       
      },
    ],
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetDashboardChart())
      .then((res) => setData(res.payload))
      .catch((e) => console.log(e));
  },[]);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} >
          <h6 className="chart_heading">Department wise - Total Vs Closed</h6>
      <div className="chart">
              <Bar options={options} data={chartdata} />
      </div>
     
        </Col>
      </Row>
    </Container>
  );
};

export default Chart;
