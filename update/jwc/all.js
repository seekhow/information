var async = require('async');
var read = require('./read');
var save = require('./save');

var site = 'jwc';
var newsList;
var articleList = {};
var fileList = {};

async.series([

  // 获取公告消息列表
  function (done) {
    read.newsList(function (err, list) {
      newsList = list;
      done(err);
    });
  },

  // 保存公告消息列表
  function (done) {
    save.newsList(site,newsList, done)
  },

  // 依次获取所有公告消息的内容
  function (done) {
    async.eachSeries(newsList, function (c, next) {
      read.articleList(c.id, function (err, articlelist,filelist) {
        articleList[c.id] = articlelist;
        fileList[c.id] = filelist;
        next(err);
      });
    }, done);
  },

  // 保存公告内容
    function (done) {
        async.eachSeries(Object.keys(articleList), function (articleListId, next) {
            save.article(site,articleListId, articleList[articleListId], next);
        }, done);
    },
  //保存附件内容
    function (done) {
        async.eachSeries(Object.keys(fileList), function (fileListId, next) {
            save.file(site,fileListId, fileList[fileListId], next);
        }, done);
    }
], function (err) {
  if (err) console.error(err.stack);

  console.log('教务处完成');
});

