const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
//findOne 是MongoDB的方法
const passport = require("passport")
//引入"表"
const History = require("../../models/History.js")


//$route GET api/history/test
//@desc 返回请求的json数据
//@access public 看是否为公开接口还是私有 
router.get("/test",(req,res)=>{
	res.json({msg:"用户操作历史记录"})
})


//历史记录添加
//$route POST api/history/push
//@desc 
//@access public 
router.post("/push", (req,res) => {
    // console.log(req.body)

	const newHistory = new History({
		user_college:req.body.user_college,
		user_name:req.body.user_name,
		user_school_id:req.body.user_school_id,
		user_option_type:req.body.user_option_type,
	})

	newHistory .save()
			   .then(history => res.json(history))
        
})

// 历史记录查询
// $route POST api/history/find
// @desc 
// @access public
router.post("/find", (req,res) => {
	if (req.body.college === '' || req.body.college == undefined) {
        // 如果没有指定学院 默认返回全部
        History.find()
        .then(item =>{
            res.json({
                code:200,
                msg:"查询全部楼层所有历史信息",
                item
            })
        })
    } else if (req.body.college !== '') {
        Seat.find({user_college: req.body.college})
        .then(item =>{
            res.json({
                code:200,
                msg:"查询"+req.body.college+"的信息",
                item
            })
        })
    }
})

// 聚合$sum计算
// $route POST api/history/sum
// @desc 
// @access public
router.post("/sum", (req,res) => {
	History.aggregate([{$group : {_id : "$user_college", num_tutorial : {$sum : 1}}}]).then(item =>{
		// ,{$sort : {"num_tutorial":-1}}
		res.json(item)
	})
})
module.exports = router
