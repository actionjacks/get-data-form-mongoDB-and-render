const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("./config");
const mongoose = require("mongoose");

mongoose.connect(config.db, { useNewUrlParser: true });
//sprawdzamy czy sie polaczylismy
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("----CONNECTED TO DATABSE-----");
});

const indexRouter = require("./routes/index");
const dataBaseRouter = require("./routes/dataBase");

//database acess
//mongodb+srv://jack:<password>@jaxoo.lcoew.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongodb+srv://jack:riprip@jaxoo.lcoew.mongodb.net/jaxoo-db?retryWrites=true&w=majority

const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//skrypt ktory przeleci przed renderowaniem royterow
app.use(function (req, res, next) {
  console.log(req.path);
  res.locals.path = req.path; //dzieki takiemu zapisowi lokalne scizezki gdzie jestesmy na stroni beda ostpne globalnie
  // aby serewr sie nie zawiesil trzeba dac next
  next();
});

app.use("/", indexRouter);
app.use("/database", dataBaseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
