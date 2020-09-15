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

let sql = 'insert into nodebook set ?';
let data = {
	name:"111",
	author:"222",
	category:"文学",
	descript:"233"
}



//操作数据库
connection.query(sql,data,function(error,results,fields) {
	if(error) throw error;
	if(results.affectedRows == 1) {
		console.log('数据插入成功');
	}
});
//关闭数据库
connection.end();