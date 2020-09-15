const path = require('path');
const db = require('./db.js');
const fs = require('fs'); 


//渲染主页
exports.showIndex = (req,res) => {
	let sql = 'select * from nodebook';
	db.base(sql,null,(result) => {
		res.render('index',{list:result});
	});
}
//跳转到添加图书的页面
exports.toAddBook = (req,res) => {
	res.render('addBook',{});
}
//添加图书,保存数据
exports.addBook = (req,res) => {
	//获取表单数据
	let info = req.body;
	let sql = 'insert into nodebook set ?';
	db.base(sql,info,(result) => {
		if(result.affectedRows == 1) {
			//重定向:文件写入成功后重新跳转到主页面
			res.redirect('/');
		}
	});
}
//跳转到修改图书页面
exports.toEditBook = (req,res) => {
	//接收传过来的id值
	let id = req.query.id;
	let sql = 'select * from nodebook where id = ?';
	let data = [id];
	db.base(sql,data,(result) => {
		res.render('editBook',result[0]);
	});
}
//修改图书，更新数据
exports.editBook = (req,res) => {
	//接收参数
	let info = req.body;
	let sql = 'update nodebook set name=?,author=?,category=?,descript=? where id=?';
	let data = [info.name,info.author,info.category,info.descript,info.id];
	db.base(sql,data,(result) => {
		if(result.affectedRows == 1) {
			res.redirect('/');
		}
	});
}
//删除图书
exports.deleteBook = (req,res) => {
	//接收传过来的id值
	let id = req.query.id;
	let sql = 'delete from nodebook where id = ?';
	let data = [id];
	db.base(sql,data,(result) => {
		if(result.affectedRows == 1) {
			res.redirect('/');
		}
	});
}
