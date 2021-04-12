// 历史信息表数据结构设计

/**
 * 用户学院
 * 用户姓名
 * 用户一卡通
 * 用户操作座位类型（入座 退座）
 * 时间
 */

 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 
 //create Schema 数据模型设计
 const HistorySchema=new Schema({
     user_college:{
         type:String,
         required:true
     },
     user_name:{
         type:String,
         required:true,
     },
     user_school_id:{ 
         type:String,
         required:true
     },
     user_option_type:{ // 用户操作类型 入座 1 退座 2 预约 3
         type:String,
         required:true,
     },
     option_time:{ // 用户操作时的时间
         type:Date,
         default:Date.now//创建的时候时间是多少就是多少
     }
 })
 
 module.exports = History = mongoose.model("history",HistorySchema)