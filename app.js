const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");

const app = express();
// configure app
app.use(morgan("tiny"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/", indexRouter);

app.listen(3000);
