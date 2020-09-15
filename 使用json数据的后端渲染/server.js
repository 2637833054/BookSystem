const data = require('./data.json');
const path = require('path');
const fs = require('fs'); 

//获取数据中id的最大值
let maxBookCode = () => {
	let arr = [];
	data.forEach((item) => {
		arr.push(item.id);
	});
	//返回arr数组中的最大值
	return Math.max.apply(null,arr);
}



//渲染主页
exports.showIndex = (req,res) => {
	res.render('index',{list:data});
}
//跳转到添加图书的页面
exports.toAddBook = (req,res) => {
	res.render('addBook',{});
}
//添加图书,保存数据
exports.addBook = (req,res) => {
	//获取表单数据
	let info = req.body;
	let book = {};
	for(let key in info) {
		book[key] = info[key];
	}
	book.id = maxBookCode() + 1;
	data.push(book);
	//把内存中的数据写入文件                   JSON.stringify(data,null,4),4：格式化数据时前面填充4个空格
	fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err) => {
		if(err) {
			res.send('server error');
		}
		//重定向:文件写入成功后重新跳转到主页面
		res.redirect('/');
	});
}
//跳转到修改图书页面
exports.toEditBook = (req,res) => {
	//接收传过来的id值
	let id = req.query.id;
	let book = {};
	//遍历数据，匹配id值
	data.forEach((item) => {
		if(id == item.id) {
			book = item;
			return;
		}
	});
	res.render('editBook',book);
}
//修改图书，更新数据
exports.editBook = (req,res) => {
	//接收参数
	let info = req.body;
	data.forEach((item) => {
		if(info.id == item.id) {
			for(let key in info) {
				item[key] = info[key];
			}
			return;
		}
	});
	//把内存中的数据写入文件                   JSON.stringify(data,null,4),4：格式化数据时前面填充4个空格
	fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err) => {
		if(err) {
			res.send('server error');
		}
		//重定向:文件写入成功后重新跳转到主页面
		res.redirect('/');
	});
}
//删除图书
exports.deleteBook = (req,res) => {
	//接收传过来的id值
	let id = req.query.id;
	let book = {};
	//遍历数据，匹配id值
	data.forEach((item,index) => {
		if(id == item.id) {
			//删除一条数据
			data.splice(index,1);
		}
		return;
	});
	//把内存中的数据写入文件                   JSON.stringify(data,null,4),4：格式化数据时前面填充4个空格
	fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err) => {
		if(err) {
			res.send('server error');
		}
		//重定向:文件写入成功后重新跳转到主页面
		res.redirect('/');
	});
}
