const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
//findOne 是MongoDB的方法
const passport = require("passport")
//引入"表"
const Reputation = require("../../models/Reputation.js")

// $route GET api/reputation/test
// @desc 返回请求的json数据
// @access public 看是否为公开接口还是私有 
router.get("/test",(req,res)=>{
	res.json({msg:"用户举报历史记录"})
})

// $route GET api/reputation/informant
// @desc 举报接口
// @access public 看是否为公开接口还是私有 
router.post("/informant", (req,res) => {
    console.log(req.body)

	const newReputation = new Reputation({
		informant:req.body.informant,
		informant_school_id:req.body.informant_school_id,
		be_informant:req.body.be_informant,
		be_informant_shcool_id:req.body.be_informant_shcool_id,
        seat_id:req.body.seat_id,
        remark:req.body.remark,
		pic_adress:req.body.pic_adress
	})

	newReputation .save()
			   .then(reputation => res.json(reputation))
        
})

module.exports = router