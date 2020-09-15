const db = require('./db.js');

//插入操作
// let sql = 'insert into nodebook set ?';
// let data = {
// 	name:"111",
// 	author:"222",
// 	category:"文学",
// 	descript:"233"
// }
// db.base(sql,data,(result) => {
// 	console.log(result);
// });

//更新操作
// let sql = 'update nodebook set name=?,author=?,category=?,descript=? where id=?';
// let data = ['明朝那些事','今年明月','文学','哈哈哈',8];
// db.base(sql,data,(result) => {
// 	console.log(result);
// });

//删除操作
// let sql = 'delete from nodebook where id = ?';
// let data = [6]; 
// db.base(sql,data,(result) => {
// 	console.log(result);
// });

//查询操作
let sql = 'select * from nodebook where id = ?';
let data = [8];
db.base(sql,data,(result) => {
	console.log(result[0]);
});