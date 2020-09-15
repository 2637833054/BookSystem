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

let sql = 'select * from nodebook';
let data = null;



//操作数据库
connection.query(sql,data,function(error,results,fields) {
	if(error) throw error;
	console.log(results[1].name);
});
//关闭数据库
connection.end();