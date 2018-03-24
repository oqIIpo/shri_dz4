const express = require("express");
const path = require("path");
const { getAppRoot, promisifiedReadDir } = require("../utils/utils");

const router = express.Router();

const getReposList = () => promisifiedReadDir(path.join(getAppRoot(), process.env.REPOS_DIR));
/* GET home page. */
router.get("/", (req, res, next) => {
  getReposList().then((repos) => {
    res.render("index", {
      title: "Express",
      repos: repos.map(r => ({ name: r })),
    });
  });
});

module.exports = router;
