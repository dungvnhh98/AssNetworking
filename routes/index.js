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

router.post("/login", function (req, res, next) {
  var dulieu = req.body;
  console.log(dulieu);
  taikhoan
    .find({ username: dulieu.username, password: dulieu.password })
    .then((data) => {
      if (data.length > 0) {
        console.log("Đăng nhập thành công");
        res.send({ checklogin: true });
      } else {
        console.log("Đăng nhập thất bại. Sai tài khoản hoặc mật khẩu");
        res.send({ checklogin: false });
      }
    });
});

router.post("/register", function (req, res, next) {
  var dulieu = req.body;
  console.log(dulieu);

  taikhoan.find({ username: dulieu.username }).then((data) => {
    if (data.length > 0) {
      console.log("Trùng username");
      res.send({ checkusername: false, checkemail: false });
    } else {
      taikhoan.find({ email: dulieu.email }).then((data) => {
        if (data.length > 0) {
          console.log("trùng email");
          res.send({ checkusername: true, checkemail: false });
        } else {
          var tkmoi = new taikhoan({
            username: dulieu.username,
            password: dulieu.password,
            email: dulieu.email,
            fullname: dulieu.fullname,
          });
          tkmoi.save().then(() => console.log("Đăng ký thành công"));
          res.send({ checkusername: true, checkemail: true });
        }
      });
    }
  });
});

module.exports = router;
