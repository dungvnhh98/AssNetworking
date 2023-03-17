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
  res.render("index");
});

router.post("/login", function (req, res, next) {});
router.post("/register", function (req, res, next) {
  var data = req.body;
  var reply = { replyusername: true, replyemail: true };
  taikhoan.find({ username: data.username }).then((data) => {
    if (data.length > 0) {
      reply.replyusername = false;
    }
  });
  taikhoan.find({ email: data.email }).then((data) => {
    if (data.length > 0) {
      reply.replyemail = false;
    }
  });
  if (reply.replyusername && reply.replyemail) {
    var tkmoi = new taikhoan({
      username: data.username,
      password: data.password,
      email: data.email,
      fullname: data.fullname,
    });
    tkmoi.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Đăng ký thành công");
      }
    });
  } else {
    console.log("Đăng ký thất bại do trùng tên hoặc email");
  }
  res.send(reply);
});

module.exports = router;
