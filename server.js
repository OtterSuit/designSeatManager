const express = require('express');
const mongoose = require("mongoose");
const { Server } = require('http');
const app = express();//实例化一个app

const port = process.env.PORT||9999;
//设置路由
app.get("/",(req,res)=>{
	res.send("Hello world!！!")
})
// 使用应用路由
//hellotest.js
const hellotest = require("./route/api/hellotest.js")
//使用routes
app.use("/api/hellotest",hellotest);
//DB config
const db = require("./config/keys.js").mongoURI;
//Connect to mongodb
mongoose.connect(db)
			.then(() => console.log("mongoDB connect!"))
			.catch(err => console.log(err))

app.listen(port,()=>{
	console.log(`Server running on port ${port}`);
})