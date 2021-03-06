//login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");//密码加密
const gravatar = require('gravatar') //头像
const jwt= require('jsonwebtoken');//使用jwt实现token
const passport = require("passport")
const keys = require("../../config/keys.js");
const User = require("../../models/User")

//引入验证方法
const validateRegisterInput = require("../../validation/register.js")
const validateLoginInput = require("../../validation/login.js")

//$route GET api/users/test
//@desc 返回请求的json数据
//@access public 看是否为公开接口还是私有 
router.get("/test", (req,res) => {
	res.json({msg: "login works"})
})

//$route POST api/users/register
//@desc 返回请求的json数据
//@access public 
router.post("/register", (req,res) => {
    // console.log(req.body)
    const {errors,isValid} = validateRegisterInput(req.body)

    // 判断isValid是否通过
    if(!isValid) {
        return res.json(errors);
    }

    // 查询数据库是否拥有一卡通
    User.findOne({school_id: req.body.school_id})
        .then((user) => {
            if(user) {
                return res.json({school_id: "该一卡通已被注册！", code: 400})
            }else{
                // 头像
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                  });

                const newUser = new User({
                    school_id: req.body.school_id,
                    name: req.body.name,
                    email: req.body.email,
                    college: req.body.college,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                })
                bcrypt.genSalt(10, function(err,salt){
					bcrypt.hash(newUser.password,salt, function(err,hash) {
						//Store hash in your password DB
						if(err) throw err;
						
						newUser.password = hash;
						
						newUser.save()
							.then(user =>res.json(user))
							.catch(err => console.log(err))
					});
				});
            }
        })
})

//$route POST api/users/login
//@desc 返回token jwt passport
//@access public 

router.post("/login", (req,res) => {
    const {errors,isValid} = validateLoginInput(req.body)

    // console.log(req)
    // 判断isValid是否通过
    if(!isValid) {
        errors.code = 400
        return res.json(errors);
    }


    const school_id = req.body.school_id;
    const password = req.body.password;
    // 查询数据库
    User.findOne({school_id})
        .then(user => {
            if(!user){
                return res.json({msg: "用户不存在！", code: 400})
            }

            // 密码匹配
            bcrypt.compare(password,user.password)
                  .then(isMatch => {
                        if(isMatch){
                            const rule = {id: user.id,name: user.name,school_id: user.school_id, identity: user.identity }
                            //jwt.sign("规则","加密名字","{过期时间}","箭头函数")
                            jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err,token) => {
                                if(err) throw err;
                                res.json({
                                    code: 200, //成功标识
                                    success: true,
                                    token: "Bearer " + token
                                })
                            })
                        }else {
                            return res.json({password: "密码错误", code: 400})
                        }
                    })
        })
})


//用户拿到了token
//$route GET api/users/current
//@desc return current user
//@access Private
router.get("/current", passport.authenticate("jwt", {session: false}), (req,res) => {
        res.json({
            code: 200,
            id: req.user.id,
            school_id: req.user.school_id,
            name: req.user.name,
            email: req.user.email,
            college: req.user.college,
            identity: req.user.identity
        });
    })


// 查看全部用户 表格展示 统计
//$route GET api/users/allUser
//@desc 管理员查询所有用户 做统计等 前端做调用该接口限制
//@access Private

router.get("/allUser",(req,res)=>{
    User.find()
    .then(result =>{
        res.json({
            code: 200,
            result
        })
    })
})


//$route POST api/users/userQuery
//@desc 按学号查
//@access public 

router.post("/userQuery", (req,res) => {

    const { school_id } = req.body
    if(!school_id || school_id.length !== 10) {
        return res.json({
            code: 400,
            msg: '请输入正确的学号'
        });
    }
    console.log(school_id.length !== 10);
    
    // 查询数据库
    User.findOne({school_id})
        .then(user => {
            if(!user){
                return res.json({msg: "用户不存在！", code: 400})
            }
            const newUser = {
                id: user._id,
                school_id: user.school_id,
                name: user.name,
                identity: user.identity,
                college: user.college,
                seat_id: user.seat_id || '',
                reputation: user.reputation,
                email: user.email
            }
            return res.json({
                code: 200,
                item: newUser
            })
        })
})

//$route POST api/users/userQuery
//@desc 按名字查
//@access public 

router.post("/userQueryForName", (req,res) => {

    const { name } = req.body
    if(!name) {
        return res.json({
            code: 400,
            msg: '请输入正确的姓名'
        });
    }
    console.log(name.length !== 10);
    
    // 查询数据库
    User.findOne({name})
        .then(user => {
            if(!user){
                return res.json({msg: "用户不存在！", code: 400})
            }
            const newUser = {
                id: user._id,
                school_id: user.school_id,
                name: user.name,
                identity: user.identity,
                college: user.college,
                seat_id: user.seat_id || '',
                reputation: user.reputation,
                email: user.email
            }
            return res.json({
                code: 200,
                item: newUser
            })
        })
})



//$route POST api/users/pickSeat
//@desc 改变user用户中的seat_id在落座之后
//@access public 
router.post("/pickSeat", (req,res) => {
    const userSeatFileFields = {}
    if(req.body.school_id!=='') 
    {
        userSeatFileFields.seat_id = req.body.seat_id // 获得前端给的值 
    }
    console.log(userSeatFileFields)
    const whereStr = {school_id: req.body.school_id};  // 查询条件
    const updateStr = userSeatFileFields
    User.updateOne(whereStr, updateStr, function(err, ress) {
        if (err) throw err;
        console.log("更新成功");
        const result = {}
        result.code = 200
        result.msg = "座位入座成功,user中存入seat_id"
        res.json(result)
    })
})

//$route POST api/users/outSeat
//@desc 改变user用户中的seat_id在退座之后（该接口针对单个用户的退座）
//@access public 
router.post("/outSeat", (req,res) => {
    const seatOut = {}
    seatOut.seat_id = '';
    const updateStr = seatOut ;
    const whereStr = {school_id: req.body.school_id};  // 查询条件
    // User.find({seat_id :/^F/}).then(item =>{
    //     res.json({
    //         code:200,
    //         msg:"一键退座",
    //         item
    //     })
    // })
    User.updateOne(whereStr,updateStr, function(err, ress) {
        if (err) throw err;
        console.log("更新成功");
        const result = {}
        result.code = 200
        result.msg = "个人用户退座成功"
        res.json(result)
    })
})

//$route POST api/users/outAllSeat
//@desc 改变user用户中的seat_id在退座之后（该接口针对全部用户）
//@access public 
router.post("/outAllSeat", (req,res) => {
    const seatOut = {}
    seatOut.seat_id = '';
    const updateStr = seatOut ;
    const whereStr = {seat_id :/^F/};  // 查询条件
    // User.find({seat_id :/^F/}).then(item =>{
    //     res.json({
    //         code:200,
    //         msg:"一键退座",
    //         item
    //     })
    // })
    User.updateMany(whereStr,updateStr, function(err, ress) {
        if (err) throw err;
        console.log("更新成功");
        const result = {}
        result.code = 200
        result.msg = "全部用户退座成功"
        res.json(result)
    })
})

//  用户修改信息
//  $route POST 
//  @desc 
//  @access Private
router.post("/change", passport.authenticate("jwt", {session: false}), (req,res) => {

            const newUser = {
                name: req.body.name,
                email: req.body.email,
                college: req.body.college,
            }
    
            User.findOneAndUpdate({ school_id: req.user.school_id }, { $set:newUser }, { new:true }).then(user => {
                if (user) {
                    res.json({
                        code: 200,
                        user
                    })
                } else {
                    res.json({
                        code: 400,
                        msg: '修改失败,请重试！！'
                    })
                }
            })
        })
    
    //  用户修改密码
    //  $route POST
    //  @desc return current user
    //  @access Private
    router.post("/password", passport.authenticate("jwt", {session: false}), (req,res) => {
    
            const oldPassword = req.body.oldPassword
            const newPassword = req.body.newPassword
    
            User.findOne({ school_id: req.user.school_id }).then(user => {
                if (user) {
                    // 密码匹配
                    console.log(oldPassword, user.password);
                    bcrypt.compare(oldPassword, user.password)
                            .then(isMatch => {
                                if (isMatch) {
                                    bcrypt.genSalt(10, (err,salt) => {
                                        bcrypt.hash(newPassword, salt, (err,hash) => {
                                            //Store hash in your password DB
                                            if(err) throw err;
                                            
                                            user.password = hash
                                            user.save().then(user => {
                                                res.json({
                                                    code: 200,
                                                    user
                                                })
                                            })
                                        })
                                    })
                                }
                            })
                        }
                    })
                })

//$route POST api/users/reputationChange
//@desc 用户信誉分遭到扣除
//@access public 
router.post("/reputationChange", (req,res) => {
    const userReputationFileFields = {}
    if(req.body.school_id!=='') 
    {
        userReputationFileFields.reputation = req.body.reputation // 获得前端给的值 
    }
    console.log(userReputationFileFields)
    const whereStr = {school_id: req.body.school_id};  // 查询条件
    const updateStr = userReputationFileFields
    User.updateOne(whereStr, updateStr, function(err, ress) {
        if (err) throw err;
        console.log("更新成功");
        const result = {}
        result.code = 200
        result.msg = "用户被扣除信誉分"
        res.json(result)
    })
})
module.exports = router;