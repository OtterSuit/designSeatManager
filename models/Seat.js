const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create Schema 数据模型
const SeatSchema=new Schema({
	storey: { //楼层
		type: String,
		required: true
    },
    seatID: { //座位标号
        type:String,
        required:true
    },
    userNow: { //使用者名字
        type:String
    },
    status: { //座位状态 0 空闲 1 使用中 2 已被预约 3暂停使用 
        type:String
    }
})

module.exports = Seat = mongoose.model("seat",SeatSchema)