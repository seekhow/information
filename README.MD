## 简介  
一个定时爬虫程序  
能够定时爬取某大学教务处等各机构网站的公告，并存储在mysql数据库中  
加以处理综合后，在前端界面中显示出来  
一开始只是为了方便我这个懒人翻看学校各个机构网站的通知，后来发现身边的人都会遇到这个问题，所以就好好的重构这个application了  
![](http://otjjfdfdp.bkt.clouddn.com/17-9-19/44695482.jpg)  
目前还在完善程序逻辑，界面还未美化  

## 架构  
采用RESTFUL架构，实现前后端分离  
前端使用的是angular，UI库用的是Bootstrap  
后端用express搭建了web服务器

## 路由  
前端路由使用的是angular-ui-router  
`var webapp=angular.module('information', ['ui.router']);`  

## API接口
用express的路由部分设置api路径  
如:
```
    app.get('/api/jwc/show', function (req, res) {
        data.newsList(function (err, list) {
            //console.log(list);
            res.send(list);
        });
    });
```  
![](http://otjjfdfdp.bkt.clouddn.com/17-9-19/67566065.jpg)  

## mysql  
使用了'mysql'这一个模块  
```
// MySQL数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
  host:            '127.0.0.1',   // 数据库地址
  port:            3306,          // 数据库端口
  database:        'news',   // 数据库名称
  user:            'ylx',        // 数据库用户
  password:        'ylx'             // 数据库用户对应的密码
});


exports.newsTitle = function (id,callback) {
    db.query('SELECT * FROM `news-main` WHERE `newsId`=? LIMIT 1',[id], callback);
};
```  
暂时还不需要配置连接池  

## 异步  
使用了async模块来简化异步流程控制  
主要使用了async.series()来依次执行一组异步操作  
```
 async.series([
            function (done) {
                data.newsTitle(newsID, function (err, title) {
                    news.push(title);
                    done(err);
                })
            },
            function (done) {
                data.newsContent(newsID, function (err, content) {
                    news.push(content);
                    done(err);
                })
            },
            function (done) {
                data.newsFile(newsID, function (err, File) {
                    news.push(File);
                    done(err);
                })
            }
        ], function (err) {
            if (err) console.error(err.stack);
            res.send(news);
        });
```  

## 定时任务  
使用的是node-schedule模块配合childProcess来定时抓去信息  
```
schedule.scheduleJob('30 * * * * *', function(){
    console.log('test');
    var update = childProcess.spawn(process.execPath, [path.resolve(__dirname, 'update/all.js')]);
    update.stdout.pipe(process.stdout);
    update.stderr.pipe(process.stderr);
});
```


