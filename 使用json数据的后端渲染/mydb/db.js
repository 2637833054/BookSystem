//封装数据库操作方法


//加载数据库驱动
const mysql = require('mysql');
exports.base = (sql,data,callback) => {
	//创建数据库连接
	const connection = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'root',
		database:'chao'
	});
	//执行连接操作
	connection.connect();
	
	//操作数据库
	connection.query(sql,data,function(error,results,fields) {
		if(error) throw error;
		callback(results);
	});
	//关闭数据库
	connection.end();
}
