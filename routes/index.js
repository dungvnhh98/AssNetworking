const { log } = require("console");
var express = require("express");
var router = express.Router();
const http = require("http");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.yw7opqt.mongodb.net/test")
  .then((error) => {
    if (error == null) console.log("Connect Success");
  });

const account = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  fullname: String,
});
const taikhoan = mongoose.model("Account", account);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Hello" });
});

router.post("/login", function (req, res, next) {});

router.post("/register", function (req, res, next) {
  var dulieu = req.body;
  console.log(dulieu);
  var checkmail, checkusername;
  taikhoan.find({ username: dulieu.username }).then((data) => {
    if (data.length > 0) {
      console.log(data.length);
      checkusername = false;
    } else {
      checkusername = true;
    }
  });
  taikhoan.find({ email: dulieu.email }).then((data) => {
    if (data.length > 0) {
      console.log(data.length);
      checkmail = false;
    } else {
      checkmail = true;
    }
  });
  if (checkmail && checkusername) {
    var tkmoi = new taikhoan({
      username: dulieu.username,
      password: dulieu.password,
      email: dulieu.email,
      fullname: dulieu.fullname,
    });
    tkmoi.save().then(() => console.log("Đăng ký thành công"));
  } else {
    console.log("Đăng ký thất bại do trùng tên hoặc email");
  }
  res.send({ checkemail: checkmail, checkusername: checkusername });
});

module.exports = router;
