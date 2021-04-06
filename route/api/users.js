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
                return res.json({school_id: "用户不存在！", code: 400})
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
//@desc 返回token jwt passport
//@access public 

router.post("/userQuery", (req,res) => {

    const { school_id } = req.body
    if(!school_id || school_id.length !== 10) {
        return res.json({
            code: 400,
            message: '请输入正确的学号'
        });
    }
    console.log(school_id.length !== 10);
    
    // 查询数据库
    User.findOne({school_id})
        .then(user => {
            if(!user){
                return res.json({school_id: "用户不存在！", code: 400})
            }
            const newUser = {
                id: user._id,
                school_id: user.school_id,
                name: user.name,
                identity: user.identity,
                college: user.college,
                seat_id: user.seat_id || '',
            }
            return res.json({
                code: 200,
                item: newUser
            })
        })
})
module.exports = router;