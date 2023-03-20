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

const comment = new mongoose.Schema({
    idcomic: String,
    username: String,
    noidung: String,
    thoigian: String,
})
const binhluan = mongoose.model("Comment", comment);

/* GET home page. */
router.get("/", function (req, res, next) {
    // var truyenmoi = new truyentranh({
    //     id: "dragonball",
    //     name: "Dragon Ball - Super",
    //     mota: "Câu chuyện của Dragon Ball Super diễn ra ngay sau khi chiến đấu với Ma Nhân Bư, cuộc sống ở trái đất lại được hòa bình thêm 1 lần nữa. Sau đó vì nhà gần như hết tiền để chi tiêu Chichi tiền ra lệnh cho Goku phải đi kiếm tiền, và không được phép luyện tập trong thời gian này!! Videl sắp trở thành chị dâu của Goten nên Goten đã đặt ra một cuộc hành trình cùng với TRunks để tìm cho Videl một món quà!",
    //     tacgia: "Akira Toriyama, Toyotarou",
    //     namxuatban: 2021,
    //     anhbia: "images/dragonball/anhbia.jpg",
    //     noidung: [
    //         "images/dragonball/0.jpg",
    //         "images/dragonball/1.jpg",
    //         "images/dragonball/2.jpg",
    //         "images/dragonball/3.jpg",
    //         "images/dragonball/4.jpg",
    //         "images/dragonball/5.jpg",
    //         "images/dragonball/6.jpg",
    //         "images/dragonball/7.jpg",
    //         "images/dragonball/8.jpg",
    //         "images/dragonball/9.jpg",
    //         "images/dragonball/10.jpg",
    //         "images/dragonball/11.jpg",
    //         "images/dragonball/12.jpg",
    //         "images/dragonball/13.jpg",
    //         "images/dragonball/14.jpg",
    //         "images/dragonball/15.jpg",
    //         "images/dragonball/16.jpg",
    //         "images/dragonball/17.jpg",
    //         "images/dragonball/18.jpg",
    //         "images/dragonball/19.jpg",
    //         "images/dragonball/20.jpg",
    //         "images/dragonball/21.jpg",
    //         "images/dragonball/22.jpg",
    //         "images/dragonball/23.jpg",
    //         "images/dragonball/24.jpg",
    //         "images/dragonball/25.jpg",
    //         "images/dragonball/26.jpg",
    //         "images/dragonball/27.jpg",
    //         "images/dragonball/28.jpg",
    //         "images/dragonball/29.jpg",
    //         "images/dragonball/30.jpg",
    //     ],
    //     luotxem: 0,
    //     luotthich: []
    // });
    // truyenmoi.save().then(()=>{
    //     console.log("đã lưu")
    // });
    truyentranh.find({}).then((data) => {
        res.render("index", {title: "Hello", data: data[4]});
    })

});
router.get("/gettruyen", function (req, res, next) {
    truyentranh.find({}).then((data) => {
        res.send(data);
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
router.get("/getbinhluan", function (req, res, next) {
    binhluan.find({}).then((data) => {
        res.send(data);
    })
});
router.post("/postbinhluan", function (req, res, next) {
    var dulieu = req.body;
    var binhluanmoi = new binhluan({
        idcomic: dulieu.idcomic,
        username: dulieu.username,
        noidung: dulieu.noidung,
        thoigian: dulieu.thoigian
    })
    binhluanmoi.save().then(()=>{
        console.log("Đã lưu bình luận");
        binhluan.find({}).then((data)=>{
            res.send(data)
        })
    })
});
module.exports = router;
