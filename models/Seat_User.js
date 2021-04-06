const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create Schema 数据模型
const Seat_UserSchema = new Schema({
    seat_id: {
        type:Schema.Types.ObjectId, //mangoDB提供的方法，根据id拿到seat
        ref:"seat" //和seat表关联
    },
    user_id: {
        type:Schema.Types.ObjectId, //mangoDB提供的方法，根据id拿到user
        ref:"user" //和user表关联
    },
	date: {
		type: Date,
		default: Date.now //创建的时候时间是多少就是多少		
	},
    status: {
        type: String,
        default: '0'
    },
    appointment_time: { //预约时间 非必须
        type: String
    }
})

module.exports = User = mongoose.model("seat_user",Seat_UserSchema)