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
    console.log(req.body)

	const newHistory = new History({
		user_college:req.body.user_college,
		user_name:req.body.user_name,
		user_school_id:req.body.user_school_id,
		user_option_type:req.body.user_option_type,
        seat_storey:req.body.seat_storey,
        seat_id:req.body.seat_id
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
        History.find({user_college: req.body.college})
        .then(item =>{
            res.json({
                code:200,
                msg:"查询"+req.body.college+"的信息",
                item
            })
        })
    }
})

// 历史记录查询个人向
// $route POST api/history/findForOne
// @desc 
// @access public
router.post("/findForOne", (req,res) => {
    if (req.body.user_school_id !== '') {
        History.find({user_school_id: req.body.user_school_id})
        .then(item =>{
            res.json({
                code:200,
                msg:"查询"+req.body.user_school_id+"的信息",
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
    if (req.body.type === 'college'){
        History.aggregate([{$group : {_id : "$user_college", num_tutorial : {$sum : 1}}}]).then(item =>{
            // ,{$sort : {"num_tutorial":-1}}
            res.json(item)
        })
    } else if (req.body.type === 'storey'){
        History.aggregate([{$group : {_id : "$seat_storey", num_tutorial : {$sum : 1}}}]).sort({'seat_storey':-1}).then(item =>{
            // ,{$sort : {"num_tutorial":-1}}
            res.json(item)
        })
    }
})

// 删除历史记录
// $route DELETE api/history/clear
// @desc 
// @access public
router.delete("/clear", (req, res) => {
    History.remove()
      .then(() => { // 全部删除
        res.json({ del_success: true })
      })
  })


module.exports = router
