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
    Seat_User.findOne({
        $and : [
            { $or: [{seat_id: req.body.seat_id}, {user_id: req.body.user_id}]},
            {seat_type: '0', status: '1'}
        ]
    }).then(seat_user => {
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
            // Seat_User.findOneAndRemove({seat_id: req.body.seat_id, user_id: req.body.user_id}).then(seat_user => {
            //     res.json({code: 300, seat_user})
            // })
            console.log(seat_user, req.body.user_id);
            if(seat_user.user_id === req.body.user_id) {
                res.json({code: 400, errors: '对不起，你已经选座了'})
            } else {
                res.json({code: 400, errors: '对不起，该座已经有人'})
            }
        } else {
            new Seat_User(newSeatUser).save().then(seat_user => {
                res.json({code: 200, seat_user, today})
            })
        }
    })
})

//$route POST api/seat_user/appoint
//@desc 返回请求的json数据
//@access public 看是否为公开接口还是私有 
router.post("/appoint", (req,res) => {
    Seat_User.findOne({
        $and : [
            { $or: [{seat_id: req.body.seat_id}, {user_id: req.body.user_id}]},
            { seat_type: '0', status: '1' }
        ]
    }).then(seat_user => {
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
            // Seat_User.findOneAndRemove({seat_id: req.body.seat_id, user_id: req.body.user_id}).then(seat_user => {
            //     res.json({code: 300, seat_user})
            // })
            console.log(seat_user, req.body.user_id);
            if(seat_user.user_id === req.body.user_id) {
                res.json({code: 400, errors: '对不起，你已经选座了'})
            } else {
                res.json({code: 400, errors: '对不起，该座已经有人'})
            }
        } else {
            new Seat_User(newSeatUser).save().then(seat_user => {
                res.json({code: 200, seat_user, today})
            })
        }
    })
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
    const whereStr = {date: {$lte: checkTime}, status: '1'}
    Seat_User.findOne(whereStr).then(seat_user => {
        if(seat_user) {
            Seat_User.updateMany(whereStr, seatFileFields).then(ress => {
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
        } else {
            Seat_User.find().then(seat_user => {
                console.log(seat_user);
                res.json(seat_user)
            })
        }
    })
})



module.exports = router