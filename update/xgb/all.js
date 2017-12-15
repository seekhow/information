var async = require('async');
var read = require('./read');
var save = require('./save');

var site = 'xgb';
var newsList;
var articleList = {};
var newsTime;
//var fileList = {};

async.series([

  // 获取公告消息列表
  function (done) {
    read.newsList(function (err, list) {
      newsList = list;
      done(err);
    });
  },

  // 依次获取所有公告消息的内容
  function (done) {
    async.eachSeries(newsList, function (c, next) {
      read.articleList(c.id, function (err, articlelist,time) {
        articleList[c.id] = articlelist;
          newsTime = time;
        next(err);
      });
    }, done);
  },

   // 保存公告消息列表
   function (done) {
      save.newsList(site,newsList,newsTime, done)
   },

  // 保存公告内容
    function (done) {
        async.eachSeries(Object.keys(articleList), function (articleListId, next) {
            save.article(site,articleListId, articleList[articleListId], next);
        }, done);
    }
], function (err) {
  if (err) console.error(err.stack);

  console.log('学工部采集完成');
});

