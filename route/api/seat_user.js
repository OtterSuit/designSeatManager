//seatTest
const express = require("express");
const router = express.Router();
const Seat_User = require("../../models/Seat_User")
const Seat = require("../../models/Seat")
const User = require("../../models/User")
//$route GET api/seat_user/test
//@desc 返回请求的json数据
//@access public 看是否为公开接口还是私有 
router.get("/test", (req,res) => {
	res.json({msg: "座位预约选座模块"})
})

//$route POST api/seat_user/choose
//@desc 返回请求的json数据
//@access public 看是否为公开接口还是私有 
router.post("/choose", (req,res) => {
    Seat_User.findOne({seat_id: req.body.seat_id, user_id: req.body.user_id}).then(seat_user => {
        const date = new Date()
        const today = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDay()
        const newSeatUser = {
            seat_id: req.body.seat_id,
            user_id: req.body.user_id,
            seat_type: '0',
            seat_begin: new Date().getTime(),
            status: '1',
            date: new Date(today).getTime()
        }
        if(seat_user) {
            Seat_User.findOneAndRemove({seat_id: req.body.seat_id, user_id: req.body.user_id}).then(seat_user => {
                res.json({code: 300, seat_user})
            })
        } else {
            new Seat_User(newSeatUser).save().then(seat_user => {
                res.json({code: 200, seat_user, today})
            })
        }
    })
	// Seat.findById(req.body.seat_id)
    //     .then(seat => {
    //         console.log(seat.user_now);
    //         if(!seat.user_now) {
    //             User.findById(req.body.user_id)
    //                 .then(user => {
    //                     console.log(user);
    //                     res.json({code: 200, seat, user})
    //                 })
    //         }
    //         // if(seat.status === '0') {
    //         //     User.findOne({schoolID: req.body.user_id})
    //         //         .then(user => {
    //         //             console.log(user);
    //         //             console.log(user.seat_id);
    //         //             if(!user.seat_id) {
    //         //                 const newSeat = {
    //         //                     // storey: seat.storey,
    //         //                     // seat_id: seat.seat_id,
    //         //                     user_now: user._id ,
    //         //                     status: '1',
    //         //                     // appointment_time: '',
    //         //                 }
    //         //                 const newUser = {
    //         //                     // schoolID: user.schoolID,
    //         //                     // name: user.name,
    //         //                     // email: user.email,
    //         //                     // college: user.college,
    //         //                     // avatar: user.avatar,
    //         //                     // password: user.password,
    //         //                     // identity: user.identity,
    //         //                     seat_id: req.body.seat_id
    //         //                 }
    //         //                 console.log(newSeat, newUser);
    //         //                 Seat.findOneAndUpdate({seat_id: req.body.seat_id}, {$set:newSeat}, {new:true}).then(seat => {
    //         //                     if(seat) {
    //         //                         console.log(seat);
    //         //                         User.findOneAndUpdate({schoolID: req.body.user_id}, {$set:newUser}, {new:true}).then(user => {
    //         //                             res.json({code: 200, user, seat})
    //         //                         })
    //         //                     }else{
    //         //                         res.json({code: 400})
    //         //                     }
    //         //                 })
    //         //             }else{
    //         //                 const newUser = {
    //         //                     // schoolID: user.schoolID,
    //         //                     // name: user.name,
    //         //                     // email: user.email,
    //         //                     // college: user.college,
    //         //                     // avatar: user.avatar,
    //         //                     // password: user.password,
    //         //                     // identity: user.identity,
    //         //                     seat_id: ''
    //         //                 }
    //         //                 User.findOneAndUpdate({schoolID: req.body.user_id}, {$set:newUser}, {new:true}).then(user => {
    //         //                     res.json({code: 400, user})
    //         //                 })
    //         //             }
    //         //         }).catch(err => {
    //         //             res.json(err)
    //         //         })
    //         // }else {
    //         //     const newSeat = {
    //         //         // storey: seat.storey,
    //         //         // seat_id: seat.seat_id,
    //         //         status: '0',
    //         //         // appointment_time: '',
    //         //     }
    //         //     Seat.findOneAndUpdate({seat_id: req.body.seat_id}, {$set:newSeat}, {new:true}).then(seat => {
                    
    //         //         res.json({code: 400, seat})
                    
    //         //     })
    //         // }
    //     })
})

//$route POST api/seat_user/check
//@desc 返回请求的json数据
//@access public 看是否为公开接口还是私有 
router.post("/check", (req,res) => {
    const now = new Date().getTime()
    const checkTime = now - 86400000  + ''
    console.log(checkTime);
    const seatFileFields = {
        status: '0',
        seat_end: checkTime
    }
    Seat_User.updateMany({date: {$lte: checkTime}, status: '1'}, seatFileFields, function(err, ress) {
        console.log(ress);
        if(ress && ress.nModified > 0) {
            res.json({code: 200})
        } else {
            Seat_User.find().then(seat_user => {
                console.log(seat_user);
                res.json(seat_user)
            })
        }
    })
})

module.exports = router