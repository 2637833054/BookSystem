//加载数据库驱动
const mysql = require('mysql');
//创建数据库连接
const connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'chao'
});
//执行连接操作
connection.connect();

let sql = 'update nodebook set name=?,author=?,category=?,descript=? where id=?';

let data = ['明朝那些事','今年明月','文学','哈哈哈',6];



//操作数据库
connection.query(sql,data,function(error,results,fields) {
	if(error) throw error;
	if(results.affectedRows == 1) {
		console.log('数据更新成功');
	}
});
//关闭数据库
connection.end();