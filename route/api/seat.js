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
 * 调用post接口 使用updateOne更新的方法 更新表修改对应座位状态 并且前端做限制
 */

//座位状态修改
//$route POST api/seat/status
//@desc 修改修改状态
//@access public 
 router.post("/status", (req,res) => {
    console.log(req.body)
    const seatFileFields = {}
    if(req.body.status) 
    {
        seatFileFields.status = req.body.status //获得前端给的值 给seatfileFields对象赋值
    }
    console.log(seatFileFields)
    // Seat.update({status:'222233333'},{$set:seatFileFields})
    //     .then(res=>{
    //         console.log(res)
    //     })
    const whereStr = {seatID:req.body.seatID};  // 查询条件
    const updateStr = seatFileFields
    Seat.updateOne(whereStr, updateStr, function(err, ress) {
        if (err) throw err;
        console.log("更新成功");
        const result = {}
        result.code = 200
        result.msg = "座位状态改变成功"
        res.json(result)
    })



    // 查询数据库是否座位编号
    // Seat.findOne({seatID: req.body.seatID})
    //     .then((seat) => {
    //         console.log(seat)
    //         seat.updateOne({status:'1'},{$set:{status:'2222'}})
    //             .then(res =>{
    //                 console.log(res)
    //             })
            // if(seat){
            //     console.log(seat)
            //     //有这个座位
            //     // ({ $set: seatFileFields }, { new: true })
            //     seat.update({status:'1'},{ status:req.body.status }, { new: true })
            //     .then(
            //         seat => res.json(seat)
            //         );
            // }else{
            //     res.json("err")
            // }
        // })
})


// 座位查询
//$route GET api/seat/find
//@desc 返回请求的json数据
//@access public 
router.get("/find",(req,res)=>{
    Seat.find()
    .then(result =>{
        res.json({
            code:200,
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

// 查看全部座位 表格展示 统计
//$route GET api/seat/allSeat
//@desc 管理员查询所有座位 做统计等 前端做调用该接口限制
//@access public

router.get("/allSeat",(req,res)=>{
    Seat.find()
    .then(result =>{
        res.json({
            code: 200,
            result
        })
    })
})

// 查看某层楼全部座位 表格展示 统计
//$route GET api/seat/getStorey
//@desc 管理员查询某层楼所有座位 做统计等 前端做调用该接口限制
//@access public

router.get("/getStorey",(req,res)=>{
    Seat.find({storey: req.query.storey})
    .then(seats =>{
        res.json({
            code: 200,
            seats
        })
    })
})
// 查看全部座位 表格展示 统计
//$route POST api/seat/chooseSeat
//@desc 管理员查询所有座位 做统计等 前端做调用该接口限制
//@access public

router.post("/chooseSeat",(req,res)=>{
    console.log(req.body);
    Seat.findOne({_id: req.body.seat_id})
        .then(seat => {
            console.log(seat);
            if(seat.status === '0') {
                User.findOne({_id: req.body.user_id})
                    .then(user => {
                        console.log(user);
                        console.log(user.seat_id);
                        if(!user.seat_id) {
                            const newSeat = {
                                // storey: seat.storey,
                                // seat_id: seat.seat_id,
                                user_now: user._id + '',
                                status: '1',
                                // appointment_time: '',
                            }
                            const newUser = {
                                // schoolID: user.schoolID,
                                // name: user.name,
                                // email: user.email,
                                // college: user.college,
                                // avatar: user.avatar,
                                // password: user.password,
                                // identity: user.identity,
                                seat_id: req.body.seat_id
                            }
                            console.log(newSeat, newUser);
                            Seat.updateOne({_id: req.body.seat_id}, newSeat, function(err, ress) {
                                if(ress) {
                                    User.findOneAndUpdate({_id: req.body.user_id}, {$set:newUser}, {new:true}).then(user => {
                                        res.json({code: 200, user, seat})
                                    })
                                }else{
                                    res.json({code: 400})
                                }
                            })
                        }else{
                            const newUser = {
                                // schoolID: user.schoolID,
                                // name: user.name,
                                // email: user.email,
                                // college: user.college,
                                // avatar: user.avatar,
                                // password: user.password,
                                // identity: user.identity,
                                seat_id: ''
                            }
                            User.findOneAndUpdate({_id: req.body.user_id}, {$set:newUser}, {new:true}).then(user => {
                                res.json({code: 400, user})
                            })
                        }
                    }).catch(err => {
                        res.json(err)
                    })
            }else {
                const newSeat = {
                    // storey: seat.storey,
                    // seat_id: seat.seat_id,
                    status: '0',
                    // appointment_time: '',
                }
                Seat.findOneAndUpdate({_id: req.body.seat_id}, {$set:newSeat}, {new:true}).then(seat => {
                    
                    res.json({code: 400, seat})
                    
                })
            }
        })
    // Seat.find({storey: req.body.storey})
    // .then(seats =>{
    //     res.json({
    //         code: 200,
    //         seats
    //     })
    // })
})

module.exports = router //供出router