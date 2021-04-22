// 举报记录表 数据结构
/**
 * 举报人
 * 举报人一卡通
 * 被举报人
 * 被举报人一卡通
 * 座位id
 * remak描述理由
 * 图片 （存本地文件夹|存在问题）
 * 举报时间
 */

 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 
 //create Schema 数据模型设计
 const ReputatationSchema=new Schema({
     informant: { // 举报人
         type:String,
         required:true
     },
     informant_school_id: { // 举报人一卡通
         type:String,
         required:true
     },
     be_informant: { // 被举报人
         type:String,
         required:true
     },
     be_informant_shcool_id: { // 被举报人一卡通
         type:String,
         required:true
     },
     seat_id: { // 举报的座位id
        type:String,
        required:true
     },
     remark: { // 举报说明
        type:String,
        required:true
     },
     pic_adress: { //地址
        type:String
     },
     option_time:{ // 用户举报时的时间
         type:Date,
         default:Date.now//创建的时候时间是多少就是多少
     }
 })
 
 module.exports = Reputation = mongoose.model("reputation",ReputatationSchema)