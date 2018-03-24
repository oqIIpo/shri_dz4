const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const reposRouter = require("./routes/branches");
const commitsRouter = require("./routes/commits");
const filesRouter = require("./routes/files");
const fileRouter = require("./routes/file");

const app = express();
// configure app
app.use(morgan("tiny"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/", indexRouter);
app.use("/branches", reposRouter);
app.use("/commits", commitsRouter);
app.use("/files", filesRouter);
app.use("/file", fileRouter);
// app.get("/repo/:repo", (req, res, next) => {
//   res.send(req.params.repo);
// });

app.listen(3000);
