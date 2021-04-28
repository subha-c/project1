const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/db");
const routers = require('./routes/index');


// Initiate Mongo Server
global.dbConnection = config.InitiateMongoServer('foodOrder');

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Food Order application." });
});

app.use("/", routers);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
