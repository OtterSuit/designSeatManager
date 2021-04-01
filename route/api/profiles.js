const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
//findOne 是MongoDB的方法
const passport = require("passport")
//引入"表"
const Profile = require("../../models/Profiles.js")
const User=require("../../models/User.js")

//$route GET api/profiles/test
//@desc 返回请求的json数据
//@access public 看是否为公开接口还是私有 
router.get("/test",(req,res)=>{
	res.json({msg:"个人信息（简历）"})
})
/**
 * postman测试方法 调用登录接口 获得jwt 带着jwt调用 post api/profiles 
 * 填写参数 handle grade send后 同样带着jwt调用 GET api/profiles/current
 * 获得当前用户 个人信息（在个人信息页面进行调用）
 */


//（登录进入后，调用一次这个接口 生成这个用户自己的profile）
//$route POST api/profiles
//@desc 创建和编辑个人信息
//@access private 看是否为公开接口还是私有 
router.post("/",passport.authenticate("jwt",{session:false}),(req,res)=>{ //在postman测试的时候是要携带token进行测试的 jwt的作用就是验证token
	
	//要获取到对应的用户信息
	const profileFields={}
	profileFields.user = req.user.id//从前端拿到的id
	if(req.body.handle) profileFields.handle = req.body.handle //如果有 handle 则给profileFields对象赋值
	if(req.body.grade) profileFields.grade = req.body.grade

	
	Profile.findOne({ user: req.user.id })
		.then(profile => {
    		if (profile) {
      // 用户信息存在, 执行更新方法
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(profile => res.json(profile));
    } else {
      // 用户信息不存在, 执行创建方法
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = "该用户的handle个人信息已经存在,请勿重新创建!";
          res.status(400).json(errors);
        }

        new Profile(profileFields).save()
		.then(profile => res.json(profile));
      })
    }
  })


})


//$route GET api/profiles/current
//@desc 获取当前登录用户的个人信息
//@access private 看是否为公开接口还是私有 
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{ //在postman测试的时候是要携带token进行测试的 jwt的作用就是验证token
	const errors = {}
	//populated作用是吧users表中的名字和学院也一起拿过来放到profile 展示用户信息
	Profile.findOne({user:req.user.id}).populate('user',["name","college"])
	.then((profile)=>{
		if(!profile){
			errors.noprofile="该用户的信息不存在!!!"
            //res.json(req.user.id)//测试成功 拿到user.id进行比较
            res.json(res)
			return res.status(404).json(errors)
		}
		profile.code = 200
		// JSON.parse(profile)
		// console.log(JSON.parse(profile))
		console.log( profile instanceof Object )
		console.log(profile)
		res.json(profile)
	}).catch(err => res.status(404).json(err))
})


module.exports = router