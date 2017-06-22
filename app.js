/**
 * Created by neo老师 on 2017/5/12
 * 兄弟连IT教育
 */

/*
 * 配置项目入口核心文件
 * */

//加载express模块
var express = require('express');

//加载body-parser模块  post
var bodyParser = require('body-parser');

//创建app应用  相当于node.js中的http.createServer()
var app = express();

 
var User = require('./models/User');

//加载cookies模块
var Cookies = require('cookies');


//当用户访问的url是以/public开始  那么直接返回对应的__dirname+'/public'下的文件
app.use('/public', express.static(__dirname + '/public'));//项目设定

//加载模板处理模块
var swig = require('swig');

var mongoose = require('mongoose');
//加载mongoDB数据库模块

//定义当前使用的模板引擎
/*
 * 第一个参数:模板引擎的名称
 * 第二个参数:解析处理模板内容的方法
 * */
app.engine('html', swig.renderFile);

//设定模板存放的目录
app.set('views', './views');
//定义当前要使用的模板引擎  参数设定：第一个参数 必须是view engine 第二个参数和app.engine这个方法中定义的模板引擎名称
app.set('view engine', 'html');

//在开发过程中 取消模板缓存
swig.setDefaults({cache: false});

app.use(bodyParser.urlencoded({extended: true}));

//配置cookies模块
app.use(function (req, res, next) {

    req.cookies = new Cookies(req, res);

    //解析客户登陆信息
    var userInfo = {};

    //如果存在cookie信息
    if (req.cookies.get('userInfo')) {

        try {
            var cookieInfo = JSON.parse(req.cookies.get('userInfo'));

            req.userInfo = cookieInfo;


            //获取当前登陆用户的类型  是否为管理员
            User.findById(req.userInfo._id).then(function (userInfo) {

             req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();

            });
        } catch (e) {
            next();
        }
    }else{
        next();

    }


});

app.use('/admin', require('./routers/admin'));//后台模块
app.use('/api', require('./routers/api'));//逻辑模块
app.use('/', require('./routers/main'));//前台模块
app.use('/register', require('./routers/register'));//前台注册模块
app.use('/login', require('./routers/login'));//前台登陆模块

//连接mongoDB数据库
mongoose.connect('mongodb://localhost:27017/test', function (err) {

    if (err) {
        console.log('数据库连接失败!');
    } else {
        console.log('数据库连接成功!');
        //设置监听端口
        app.listen(8086);

    }
});




















