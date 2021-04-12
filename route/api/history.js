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

module.exports = router
