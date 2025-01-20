const mysql=require("mysql")
//数据库链接
const db=mysql.createPool({
	//host:'1.94.225.52',
	host:'localhost',
	user:'root',
	password:'WenYe2004',
	database:'uniappfinal'
})
module.exports=db