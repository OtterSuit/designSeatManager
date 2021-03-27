// 个人信息的数据结构

/**
 * 1个人登录信息（用户名，学院）
 * 2(学习时长)
 * 3信誉分
 * 4年级
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema 数据模型设计
const ProfileSchema=new Schema({
	user:{
		type:Schema.Types.ObjectId,//mangoDB提供的方法，根据id拿到user
		ref:"user"//和user表关联
	},
    handle:{
		type:String,
		required:true,
		max:40
	},
    grade:{ //年级 前端分析分析一卡通得出
        type:String,
        required:true
    },
	reputation:{ //信誉分
		type:String,
		// required:true,
		// max:40
	},
	date:{
		type:Date,
		default:Date.now//创建的时候时间是多少就是多少
	}
})

module.exports = Profile = mongoose.model("profile",ProfileSchema)