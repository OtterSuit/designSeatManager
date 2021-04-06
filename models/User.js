const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create Schema 数据模型
const UserSchema=new Schema({
	school_id: { //一卡通
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
		default: Date.now //创建的时候时间是多少就是多少		
	},
	seat_id: {
        type: String,
		// type:Schema.Types.ObjectId, //mangoDB提供的方法，根据id拿到user
		// ref:"seat" //和seat表关联
	}
})

module.exports = User = mongoose.model("user",UserSchema)