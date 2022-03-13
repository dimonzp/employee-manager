require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");

const meRouter = require("./routes/me");
const empoloyeeRouter = require("./routes/employees");
const authRouter = require("./routes/auth");

const authMiddleware = require("./middleware/authMiddleware");
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.URL,
    ],
    credentials: true
  })
);

app.use("/api/v1/employee", authMiddleware, empoloyeeRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/me", authMiddleware, meRouter);

(async function start() {
  try {
    await mongoose.connect(process.env.MONGOAPIKEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Mongo work");
  } catch (e) {
    console.log("Mongo Error");
  }
})();

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
