const {log} = require("console");
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

const comic = new mongoose.Schema({
    id: String,
    name: String,
    mota: String,
    tacgia: String,
    namxuatban: Number,
    anhbia: String,
    noidung: [],
    luotxem: Number,
    luotthich: []
})
const truyentranh = mongoose.model("Comic", comic);

/* GET home page. */
router.get("/", function (req, res, next) {
    // var truyenmoi = new truyentranh({
    //     id: "spyfamily",
    //     name: "SPY X Family",
    //     mota: "Câu chuyện kể về một điệp viên của \"Tây Quốc\" Westalis có mật danh là \"Hoàng hôn\", cố gắng xây dựng một \"gia đình kiểu mẫu\" nhằm thu thập thông tin tình báo tại nước đối địch, \"Đông Quốc\" Ostania",
    //     tacgia: "Endo Tatsuya",
    //     namxuatban: 2019,
    //     anhbia: "images/spyfamily/anhbia.jpg",
    //     noidung: [
    //         "images/spyfamily/002-fix.jpg",
    //         "images/spyfamily/003-fix.jpg",
    //         "images/spyfamily/004-fix.jpg",
    //         "images/spyfamily/005-fix.jpg",
    //         "images/spyfamily/006-fix.jpg",
    //         "images/spyfamily/007-fix.jpg",
    //         "images/spyfamily/008-fix.jpg",
    //         "images/spyfamily/009-fix.jpg",
    //         "images/spyfamily/010-fix.jpg",
    //         "images/spyfamily/011-fix.jpg",
    //         "images/spyfamily/012-fix.jpg",
    //         "images/spyfamily/013-fix.jpg",
    //         "images/spyfamily/014-fix.jpg",
    //         "images/spyfamily/015-fix.jpg",
    //         "images/spyfamily/016-fix.jpg",
    //         "images/spyfamily/017-fix.jpg",
    //         "images/spyfamily/018-fix.jpg",
    //         "images/spyfamily/019-fix.jpg",
    //         "images/spyfamily/020-fix.jpg",
    //         "images/spyfamily/021-fix.jpg",
    //         "images/spyfamily/022-fix.jpg",
    //         "images/spyfamily/023-fix.jpg",
    //         "images/spyfamily/024-fix.jpg",
    //         "images/spyfamily/025-fix.jpg",
    //         "images/spyfamily/026-fix.jpg",
    //         "images/spyfamily/027-fix.jpg",
    //         "images/spyfamily/028-fix.jpg",
    //         "images/spyfamily/029-fix.jpg",
    //         "images/spyfamily/030-fix.jpg",
    //         "images/spyfamily/031-fix.jpg",
    //         "images/spyfamily/032-fix.jpg",
    //         "images/spyfamily/033-fix.jpg",
    //         "images/spyfamily/034-fix.jpg",
    //         "images/spyfamily/035-fix.jpg",
    //         "images/spyfamily/036-fix.jpg",
    //         "images/spyfamily/037-fix.jpg",
    //         "images/spyfamily/038-fix.jpg",
    //         "images/spyfamily/039-fix.jpg",
    //         "images/spyfamily/040-fix.jpg",
    //         "images/spyfamily/041-fix.jpg",
    //         "images/spyfamily/042-fix.jpg",
    //         "images/spyfamily/043-fix.jpg",
    //         "images/spyfamily/044-fix.jpg",
    //         "images/spyfamily/045-fix.jpg",
    //         "images/spyfamily/046-fix.jpg",
    //         "images/spyfamily/047-fix.jpg",
    //         "images/spyfamily/048-fix.jpg",
    //         "images/spyfamily/049-fix.jpg",
    //         "images/spyfamily/050-fix.jpg",
    //         "images/spyfamily/051-fix.jpg",
    //         "images/spyfamily/052-fix.jpg",
    //         "images/spyfamily/053-fix.jpg",
    //         "images/spyfamily/054-fix.jpg",
    //         "images/spyfamily/055-fix.jpg",
    //         "images/spyfamily/056-fix.jpg",
    //         "images/spyfamily/057-fix.jpg",
    //         "images/spyfamily/058-fix.jpg",
    //         "images/spyfamily/059-fix.jpg",
    //         "images/spyfamily/060-fix.jpg",
    //         "images/spyfamily/061-fix.jpg",
    //         "images/spyfamily/062-fix.jpg",
    //         "images/spyfamily/063-fix.jpg",
    //         "images/spyfamily/064-fix.jpg",
    //         "images/spyfamily/065-fix.jpg",
    //         "images/spyfamily/066-fix.jpg",
    //         "images/spyfamily/067-fix.jpg",
    //         "images/spyfamily/068-fix.jpg",
    //         "images/spyfamily/069-fix.jpg",
    //         "images/spyfamily/070-fix.jpg",
    //         "images/spyfamily/071-fix.jpg",
    //         "images/spyfamily/072-fix.jpg"
    //     ],
    //     luotxem: 0,
    //     luotthich: []
    // });
    // truyenmoi.save().then(()=>{
    //     console.log("đã lưu")
    // });
    truyentranh.find({}).then((data) => {
        res.render("index", {title: "Hello", data: data[2]});
    })

});

router.post("/login", function (req, res, next) {
    var dulieu = req.body;
    console.log(dulieu);
    taikhoan
        .find({username: dulieu.username, password: dulieu.password})
        .then((data) => {
            if (data.length > 0) {
                console.log("Đăng nhập thành công");
                res.send({checklogin: true});
            } else {
                console.log("Đăng nhập thất bại. Sai tài khoản hoặc mật khẩu");
                res.send({checklogin: false});
            }
        });
});

router.post("/register", function (req, res, next) {
    var dulieu = req.body;
    console.log(dulieu);

    taikhoan.find({username: dulieu.username}).then((data) => {
        if (data.length > 0) {
            console.log("Trùng username");
            res.send({checkusername: false, checkemail: false});
        } else {
            taikhoan.find({email: dulieu.email}).then((data) => {
                if (data.length > 0) {
                    console.log("trùng email");
                    res.send({checkusername: true, checkemail: false});
                } else {
                    var tkmoi = new taikhoan({
                        username: dulieu.username,
                        password: dulieu.password,
                        email: dulieu.email,
                        fullname: dulieu.fullname,
                    });
                    tkmoi.save().then(() => console.log("Đăng ký thành công"));
                    res.send({checkusername: true, checkemail: true});
                }
            });
        }
    });
});

module.exports = router;
