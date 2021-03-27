//seatTest
const express = require("express");
const router = express.Router();
// const passport = require("passport")
const keys = require("../../config/keys.js");
const Seat = require("../../models/Seat")

//$route GET api/seat/test
//@desc 返回请求的json数据
//@access public 看是否为公开接口还是私有 
router.get("/test", (req,res) => {
	res.json({msg: "座位接口模块"})
})

//座位注册（添加）
//$route POST api/seat/register
//@desc 返回请求的json数据
//@access public 
router.post("/register", (req,res) => {
    // console.log(req.body)

    // 查询数据库是否座位编号
    Seat.findOne({seatID: req.body.seatID})
        .then((seat) => {
            if(seat) {
                return res.status(400).json({seatID: "该编号已被注册！"})
            }else{
                const newSeat = new Seat({
                    storey:req.body.storey,
                    seatID:req.body.seatID,
                    userNow:req.body.userNow,
                    status:req.body.status
                })

                // bcrypt.genSalt(10, function(err,salt){
				// 	bcrypt.hash(newSeat.password,salt, function(err,hash) {
				// 		//Store hash in your password DB
				// 		if(err) throw err;
						
				// 		newSeat.password = hash;
						
                    newSeat .save()
							.then(seat => res.json(seat))
							.catch(err => console.log(err))
				// 	});
				// });
            }
        })
})


//改变座位状态 思路 
/**
 * 调用post接口 使用update更新的方法 更新表修改对应座位状态
 */



// 座位查询
//$route GET api/seat/find
//@desc 返回请求的json数据
//@access public 
router.get("/find",(req,res)=>{
    Seat.find()
    .then(result =>{
        res.json({
            result
        })
    })
    // res.json({
        // storey: res.seat.storey,
        // seatID: res.seat.seatID,
        // userNow: res.seat.userNow,
        // status: res.seat.status,
    // });
})
module.exports = router //供出router