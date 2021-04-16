const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create Schema 数据模型
const SeatSchema=new Schema({
	storey: { //楼层
		type: String,
		required: true
    },
    seat_id: { //座位标号
        type:String,
        required:true
    },
    user_now: { //使用者名字
		type: String,
        // type:Schema.Types.ObjectId,//mangoDB提供的方法，根据id拿到user
		// ref:"user"//和user表关联
    },
    seat_message: {
        type: Object
    },
    status: { // 座位状态 0 空闲 1 使用中 2 已被预约 3暂停使用 4暂时离开
        type:String
    },
    appointment_time: { //预约时间 非必须
        type:String
    }

})

module.exports = Seat = mongoose.model("seat",SeatSchema)