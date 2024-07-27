const express = require("express");

const { DB_Connect } = require("./dbconnection.js");
const userRoutes = require("./routes/user.route.js");
const bodyParser = require("body-parser");

DB_Connect();

const app = express();

app.use("/api/users", userRoutes);
app.use(bodyParser.json());

app.listen(4000, (req, res) => {
  console.log(`App is running`);
});
