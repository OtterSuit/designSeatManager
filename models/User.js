const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create Schema 数据模型
const UserSchema=new Schema({
	schoolID: { //一卡通
		type: String,
		required: true
    },
    name: {
        type: String,
        required: true
    },
	email: {
		type: String,
	},
	password: {
		type: String,
		required: true
    },
    college: {  //学院
        type: String,
		required: true
    },
	avatar: { //头像
		type: String,
	},
	identity:{ //管理员标识
		type:String,
		required:true
	},
	date: {
		type: Date,
		default: Date.now//创建的时候时间是多少就是多少		
	}
})

module.exports = User = mongoose.model("user",UserSchema)