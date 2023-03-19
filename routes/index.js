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
    //     id: "op",
    //     name: "One Piece",
    //     mota: "One Piece xoay quanh 1 nhóm cướp biển được gọi là Băng Hải tặc Mũ Rơm - Straw Hat Pirates - được thành lập và lãnh đạo bởi thuyền trưởng Monkey D. Luffy. Cậu bé Luffy có ước mơ tìm thấy kho báu vĩ đại nhất, One Piece, của Vua Hải Tặc đời trước Gold D. Roger và trở thành Vua Hải Tặc đời kế tiếp. Ở Việt Nam hiện nay, truyện đang được Nhà xuất bản Thanh Hóa xuất bản nhưng không có bản quyền, với tên gọi là Đảo Hải tặc Cốt truyện: Monkey D. Luffy, 1 cậu bé rất thích hải tặc có ước mơ tìm được kho báu One Piece và trở thành Vua hải tặc - Pirate King. Lúc nhỏ, Luffy tình cờ ăn phải trái quỉ (Devil Fruit) Gomu Gomu, nó cho cơ thể cậu khả năng co dãn đàn hồi như cao su nhưng đổi lại cậu sẽ không bao giờ biết bơi. Sau đó Luffy lại được Shank cứu thoát tuy nhiên ông ta bị mất 1 cánh tay. Sau đấy Shank chia tay Luffy và để lại cho cậu cái mũ rơm (Straw Hat) và nói rằng: \"Sau này bao giờ thành cướp biển hãy gặp ta và trả lại nó\". Chính lời nói này đã thúc đầy Luffy trở thành 1 cướp biển thật sự.",
    //     tacgia: "Eiichiro Oda",
    //     namxuatban: 2015,
    //     anhbia: "images/op/anhbia.jpg",
    //     noidung: [
    //         "images/op/002-fix.jpg",
    //         "images/op/003-fix.jpg",
    //         "images/op/004-fix.jpg",
    //         "images/op/005-fix.jpg",
    //         "images/op/006-fix.jpg",
    //         "images/op/007-fix.jpg",
    //         "images/op/008-fix.jpg",
    //         "images/op/009-fix.jpg",
    //         "images/op/010-fix.jpg",
    //         "images/op/011-fix.jpg",
    //         "images/op/012-fix.jpg",
    //         "images/op/013-fix.jpg",
    //         "images/op/014-fix.jpg",
    //         "images/op/015-fix.jpg",
    //         "images/op/016-fix.jpg",
    //         "images/op/017-fix.jpg",
    //         "images/op/018-fix.jpg",
    //         "images/op/019-fix.jpg",
    //         "images/op/020-fix.jpg",
    //         "images/op/021-fix.jpg",
    //         "images/op/022-fix.jpg",
    //         "images/op/023-fix.jpg",
    //         "images/op/024-fix.jpg",
    //         "images/op/025-fix.jpg",
    //         "images/op/026-fix.jpg",
    //         "images/op/027-fix.jpg",
    //         "images/op/028-fix.jpg",
    //         "images/op/029-fix.jpg",
    //         "images/op/030-fix.jpg",
    //         "images/op/031-fix.jpg",
    //         "images/op/032-fix.jpg",
    //         "images/op/033-fix.jpg",
    //         "images/op/034-fix.jpg",
    //         "images/op/035-fix.jpg",
    //         "images/op/036-fix.jpg",
    //         "images/op/037-fix.jpg",
    //         "images/op/038-fix.jpg",
    //         "images/op/039-fix.jpg",
    //         "images/op/040-fix.jpg",
    //         "images/op/041-fix.jpg",
    //         "images/op/042-fix.jpg",
    //         "images/op/043-fix.jpg",
    //         "images/op/044-fix.jpg",
    //         "images/op/045-fix.jpg",
    //         "images/op/046-fix.jpg",
    //         "images/op/047-fix.jpg",
    //         "images/op/048-fix.jpg",
    //         "images/op/049-fix.jpg",
    //         "images/op/050-fix.jpg",
    //         "images/op/051-fix.jpg",
    //         "images/op/052-fix.jpg"
    //     ],
    //     luotxem: 0,
    //     luotthich: []
    // });
    // truyenmoi.save().then(()=>{
    //     console.log("đã lưu")
    // });
    truyentranh.find({}).then((data) => {
        res.render("index", {title: "Hello", data: data[1]});
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
