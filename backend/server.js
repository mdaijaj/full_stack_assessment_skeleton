const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
var bodyParser = require('body-parser')

// dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// const corsOpts = {
//   origin: "*",
//   methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"],
// };
// app.use(cors(corsOpts));

app.use(express.json());
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));
app.use('/upload', express.static("./upload"))
app.use(bodyParser.urlencoded({ extended: false }))

// database
const db = require("./model");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db success...");
  }).catch((err) => {
    console.log("Failed to sync db...", err)
  })

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to New Application." });
});

// routes
require('./route/index')(app);


// set port, listen for requests
const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});