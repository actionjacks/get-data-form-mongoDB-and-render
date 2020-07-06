const express = require("express");
const Data = require("../models/data");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  //tworzy przykladowy zapis do mongoDB kozystajac z models
  //   const dataData = new Data({
  //     title: "tytull test",
  //     description: "opisssss",
  //   });
  //   dataData.save((err)=>{
  //       console.log(err)
  //   });
  //dzieki find wyswietle dane
  Data.find({}, (err, data) => {
    console.log(data);
    if (err) {
      console.log("cant get databse data --- !");
    } // title przekazuje do szablonu i w szablonie mozna sie odwolac, przekazujemy data czyli dane z mongoDB
    else
      res.render("dataBase", { title: "data-base", content: "jaxo-db", data });
    //console.log(dataData);
  });
});

module.exports = router;
