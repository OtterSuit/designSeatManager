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
        return res.status(400).json(errors);
    }

    // 查询数据库是否拥有一卡通
    User.findOne({schoolID: req.body.schoolID})
        .then((user) => {
            if(user) {
                return res.status(400).json({schoolID: "该一卡通已被注册！"})
            }else{
                // 头像
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                  });

                const newUser = new User({
                    schoolID: req.body.schoolID,
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
        return res.status(400).json(errors);
    }


    const schoolID = req.body.schoolID;
    const password = req.body.password;
    // 查询数据库
    User.findOne({schoolID})
        .then(user => {
            if(!user){
                return res.status(404).json({schoolID: "用户不存在！"})
            }

            // 密码匹配
            bcrypt.compare(password,user.password)
                  .then(isMatch => {
                        if(isMatch){
                            const rule = {id: user.id,name: user.name,schoolID: user.schoolID, identity: user.identity }
                            jwt.sign(rule, keys.secretOrKey, {expiresIn: 3}, (err,token) => {
                                if(err) throw err;
                                res.json({
                                    code:200, //成功标识
                                    success: true,
                                    token: "Bearer " + token
                                })
                            })
                            //jwt.sign("规则","加密名字","{过期时间}","箭头函数")
                            // res.json({msg: "success！"})
                        }else {
                            return res.status(400).json({password: "密码错误"})
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
            code:200,
            id: req.user.id,
            schoolID: req.user.schoolID,
            name: req.user.name,
            email: req.user.email,
            college: req.user.college,
            identity: req.user.identity
        });
    })

module.exports = router;