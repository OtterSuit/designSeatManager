const Validator = require('validator')
const isEmpty = require("./is-empty")

module.exports = function validateLoginInput(data){//data是一个形参来接受req.body传递过来的东西
	let errors={};
	
	//确保都是字符串
	data.email= !isEmpty(data.schoolID) ? data.schoolID : ''
	data.password = !isEmpty(data.password) ? data.password : ''

	
	if(Validator.isEmpty(data.schoolID)){
		errors.schoolID = "一卡通不能为空"
	}

	
	if(Validator.isEmpty(data.password)){
		errors.password = "密码不能为空"
		}

	
	return {
		errors,
		isValid:isEmpty(errors)//印证是否通过 
	}
}