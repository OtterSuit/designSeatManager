const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const passport = require("passport")
const { Server } = require('http');

const app = express();//实例化一个app

const port = process.env.PORT || 9999;
//设置路由
app.get("/", (req,res) => {
	res.send("Hello world!！!")
})

// 使用应用路由
//hellotest.js
const hellotest = require("./route/api/hellotest.js")
// users.js
const users = require("./route/api/users")

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//使用routes
app.use("/api/hellotest", hellotest);
app.use("/api/users", users)

//DB config
const db = require("./config/keys.js").mongoURI;

//Connect to mongodb
mongoose.connect(db)
		.then(() => console.log("mongoDB connect!"))
		.catch(err => console.log(err))

// passport初始化
app.use(passport.initialize());

require("./config/passport")(passport);

app.listen(port,()=>{
	console.log(`Server running on port ${port}`);
})