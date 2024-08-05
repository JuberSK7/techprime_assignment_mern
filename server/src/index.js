const dotenv = require("dotenv");
const express = require('express');
const connect = require('./configs/database');
const cors = require('cors');
const { UserRoutes } = require("./routes/userRoutes");
const { ProjectRouter } = require("./routes/projectRoutes");


const PORT = process.env.PORT || 8080;
console.log('port', PORT)

const app = express();



app.use(cors({ origin: true, credentials: true }));


app.use(express.json());


app.use('/user', UserRoutes);
app.use('/project', ProjectRouter);


dotenv.config();



app.listen(PORT || 8080, async () => {
  await connect();
  console.log(`running at http://localhost:${PORT}`);
});