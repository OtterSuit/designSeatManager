//login & register
const express = require("express");
const router = express.Router();
//$route GET api/hellotest/test
//@desc 返回请求的json数据
//@access public 看是否为公开接口还是私有 
router.get("/test",(req,res)=>{
	res.json({msg:"hello world"})
})

module.exports = router //供出router
