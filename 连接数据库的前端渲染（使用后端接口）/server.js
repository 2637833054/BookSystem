const path = require('path');
const db = require('./db.js');
const fs = require('fs'); 


//渲染主页
exports.allBooks = (req,res) => {
	let sql = 'select * from nodebook';
	db.base(sql,null,(result) => {
		res.json(result);
	});
}

//添加图书,保存数据
exports.addBook = (req,res) => {
	//获取表单数据
	let info = req.body;
	let sql = 'insert into nodebook set ?';
	db.base(sql,info,(result) => {
		if(result.affectedRows == 1) {
			res.json({flag:1});
		} else {
			res.json({flag:2});
		}
	});
}
exports.getBookById = (req,res) => {
	//接收传过来的id值
	let id = req.params.id;
	let sql = 'select * from nodebook where id = ?';
	let data = [id];
	db.base(sql,data,(result) => {
		res.json(result[0]);
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
			res.json({flag:1});
		} else {
			res.json({flag:2});
		}
	});
}
//删除图书
exports.deleteBook = (req,res) => {
	//接收传过来的id值
	let id = req.params.id;
	let sql = 'delete from nodebook where id = ?';
	let data = [id];
	db.base(sql,data,(result) => {
		if(result.affectedRows == 1) {
			res.json({flag:1});
		} else {
			res.json({flag:2});
		}
	});
}
