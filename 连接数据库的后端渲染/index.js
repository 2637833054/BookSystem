const express = require('express');
const template = require('art-template');
const bodyParser = require('body-parser');
const router = require('./router.js');
const path = require('path');
const app = express();

//启动静态资源服务
app.use('/www',express.static('public'));





//设置模板的路径
app.set('views',path.join(__dirname,'views'));
//设置模板引擎
app.set('view engine','art');
//使express兼容art-template模板引擎
app.engine('art',require('express-art-template'));

//处理请求参数
//挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false}));
//处理json格式的参数
app.use(bodyParser.json());

//启动服务器
app.use(router);

//监听端口
app.listen(520,() => {
	console.log('running...');
});