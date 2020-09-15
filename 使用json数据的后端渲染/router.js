const express = require('express');
const router = express.Router();
const server = require('./server.js');

//路由处理

//渲染主页
router.get('/',server.showIndex);
//添加图书（跳转到图书的页面）
router.get('/toAddBook',server.toAddBook);
//添加图书（提交表单）
router.post('/addBook',server.addBook);
//跳转到修改图书的页面
router.get('/toEditBook',server.toEditBook);
//修改图书提交表单
router.post('/editBook',server.editBook);
//删除图书
router.get('/deleteBook',server.deleteBook);
module.exports = router;
