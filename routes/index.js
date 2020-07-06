const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  // title przekazuje do szablonu i w szablonie mozna sie odwolac
  res.render("index", { title: "dupa", content: "dupa2" });
});

module.exports = router;
