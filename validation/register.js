const Validator = require('validator')
const isEmpty = require("./is-empty")

module.exports = function validateRegisterInput(data){//data是一个形参来接受req.body传递过来的东西
	let errors = {};
	
	//确保都是字符串
	data.name = !isEmpty(data.name) ? data.name : ''
    data.school_id = !isEmpty(data.school_id) ? data.school_id : ''
    data.college =  !isEmpty(data.college) ? data.college : ''
	data.password = !isEmpty(data.password) ? data.password : ''
	data.password2 = !isEmpty(data.password2) ? data.password2 : ''
	
	if(!Validator.isLength(data.name, {min:2,max:30})) {
		errors.name = "名字的长度不能小于2位，并且不能大于30位"
	}	
	if(Validator.isEmpty(data.name)) {
		errors.name = "名字不能为空"
    }

    if(Validator.isEmpty(data.school_id)) {
		errors.school_id = "一卡通码不能为空"
	}
    if(!Validator.isLength(data.school_id,{min:10, max:10})) {
		errors.school_id = "请输入正确的一卡通"
	}	
    
    if(Validator.isEmpty(data.college)) {
		errors.password = "所属学院不能为空"
	}
    
	if(Validator.isEmpty(data.password)) {
		errors.password = "密码不能为空"
	}
	if(!Validator.isLength(data.password, {min:6,max:30})) {
		errors.password = "密码要为6~30位"
	}	
	if(Validator.isEmpty(data.password2)) {
		errors.password2 = "确认密码不能为空"
	}		
	if(!Validator.equals(data.password,data.password2)) {
		errors.password2 = "两次密码不一致！"
	}
	/*  */
	return {
		errors,
		isValid: isEmpty(errors)//印证是否通过 
	}
}