//seatTest
const express = require("express");
const router = express.Router();
// const passport = require("passport")
const keys = require("../../config/keys.js");
const Seat = require("../../models/Seat")
const User = require("../../models/User")

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
    Seat.findOne({seat_id: req.body.seat_id})
        .then((seat) => {
            if(seat) {
                return res.status(400).json({seat_id: "该编号已被注册！"})
            }else{
                const newSeat = new Seat({
                    storey:req.body.storey,
                    seat_id:req.body.seat_id,
                    user_now:req.body.user_now,
                    status:req.body.status,
                    appointment_time:req.body.appointment_time
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
    const whereStr = {seat_id:req.body.seat_id};  // 查询条件
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
    // Seat.findOne({seat_id: req.body.seat_id})
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

//座位预约
//$route POST api/seat/appointment
//@desc 用户预约座位
//@access public 
router.post("/appointment", (req,res) => {
    console.log(req.body)
    const seatFileFields = {}
    if(req.body.status!=='') 
    {
        seatFileFields.status = req.body.status // 获得前端给的值 给seatfileFields对象赋值0
        seatFileFields.appointment_time = req.body.appointment_time // 获得前端给的时间即预约过期时间
        // seatFileFields.user_now = req.body.user_id // 获得前端给的时间即预约过期时间
    }
    console.log(seatFileFields)
    const whereStr = {seat_id: req.body.seat_id};  // 查询条件
    const updateStr = seatFileFields
    Seat.updateOne(whereStr, updateStr, function(err, ress) {
        if (err) throw err;
        console.log("更新成功");
        const result = {}
        result.code = 200
        result.msg = "座位预约成功"
        res.json(result)
    })

})


// 座位落座
//$route POST api/seat/pickSeat
//@desc 前端提供 要坐的seatid 使用者名字
//@access public 
router.post("/pickSeat", (req,res) => {
    console.log(req.body)
    const seatFileFields = {}
    if(req.body.status!=='') 
    {
        seatFileFields.status = req.body.status // 获得前端给的值 给seatfileFields对象赋值0
        seatFileFields.user_now = req.body.user_now // 获得前端给的时间即预约过期时间
    }
    console.log(seatFileFields)
    const whereStr = {seat_id: req.body.seat_id};  // 查询条件
    const updateStr = seatFileFields
    Seat.updateOne(whereStr, updateStr, function(err, ress) {
        if (err) throw err;
        console.log("更新成功");
        const result = {}
        result.code = 200
        result.msg = "座位入座成功"
        res.json(result)
    })

})

// 座位退座(一键退座)
//$route POST api/seat/outAllSeat
//@desc 
//@access public 
router.post("/outAllSeat", (req,res) => {
    const seatOut = {}
    seatOut.status = '0';
    seatOut.user_now = '';
    const whereStr = {status: '1'};  // 查询条件
    const updateStr = seatOut ;
    // Seat.find(whereStr).then(item =>{
    //     res.json({
    //         code:200,
    //         msg:"一键退座",
    //         item
    //     })
    // })
    Seat.update(whereStr, updateStr, function(err, ress) {
        if (err) throw err;
        console.log("更新成功");
        const result = {}
        result.code = 200
        result.msg = "座位退座成功"
        res.json(result)
    })

})

// 座位查询
//$route POST api/seat/find
//@desc 返回请求的json数据
//@access public 
router.post("/find",(req,res)=>{
    if(req.body.storey === '' || req.body.storey == null) {
        // 如果没有指定规定楼层 默认返回全部
        Seat.find()
        .then(item =>{
            res.json({
                code:200,
                msg:"查询全部楼层所有座位信息",
                item
            })
        })
    }else {
        Seat.find({"storey":req.body.storey})
        .then(item =>{
            res.json({
                code:200,
                msg:"查询"+req.body.storey+"楼层的信息",
                item
            })
        })
    }
    
    // res.json({
        // storey: res.seat.storey,
        // seat_id: res.seat.seat_id,
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
    Seat.findOne({seat_id: req.body.seat_id})
        .then(seat => {
            console.log(seat);
            if(seat.status === '0') {
                User.findOne({school_id: req.body.user_id})
                    .then(user => {
                        console.log(user);
                        console.log(user.seat_id);
                        if(!user.seat_id) {
                            const newSeat = {
                                // storey: seat.storey,
                                // seat_id: seat.seat_id,
                                user_now: user._id ,
                                status: '1',
                                // appointment_time: '',
                            }
                            const newUser = {
                                // school_id: user.school_id,
                                // name: user.name,
                                // email: user.email,
                                // college: user.college,
                                // avatar: user.avatar,
                                // password: user.password,
                                // identity: user.identity,
                                seat_id: req.body.seat_id
                            }
                            console.log(newSeat, newUser);
                            Seat.findOneAndUpdate({seat_id: req.body.seat_id}, {$set:newSeat}, {new:true}).then(seat => {
                                if(seat) {
                                    console.log(seat);
                                    User.findOneAndUpdate({school_id: req.body.user_id}, {$set:newUser}, {new:true}).then(user => {
                                        res.json({code: 200, user, seat})
                                    })
                                }else{
                                    res.json({code: 400})
                                }
                            })
                        }else{
                            const newUser = {
                                // school_id: user.school_id,
                                // name: user.name,
                                // email: user.email,
                                // college: user.college,
                                // avatar: user.avatar,
                                // password: user.password,
                                // identity: user.identity,
                                seat_id: ''
                            }
                            User.findOneAndUpdate({school_id: req.body.user_id}, {$set:newUser}, {new:true}).then(user => {
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
                Seat.findOneAndUpdate({seat_id: req.body.seat_id}, {$set:newSeat}, {new:true}).then(seat => {
                    
                    res.json({code: 400, seat})
                    
                })
            }
        })
})

module.exports = router //供出router