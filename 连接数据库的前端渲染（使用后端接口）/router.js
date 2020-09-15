const express = require('express');
const router = express.Router();
const server = require('./server.js');

//所有接口、路由处理

//提供和所有的图书信息
router.get('/books',server.allBooks);
//添加图书信息时提交数据
router.post('/books/book',server.addBook);
//编辑图书信息时根据id查询相应信息
router.get('/books/book/:id',server.getBookById);
//提交编辑时的数据
router.put('/books/book',server.editBook);
//删除图书信息
router.delete('/books/book/:id',server.deleteBook);

module.exports = router;
