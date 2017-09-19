var async = require('async');
var db = require('./config').db;
var debug = require('debug')('blog:update:save');


/**
 * 保存公告消息列表
 */
exports.newsList = function (list, callback) {

  async.eachSeries(list, function (item, next) {
    // 查询公告是否已存在
    db.query('SELECT * FROM `news-main` WHERE `newsId`=? LIMIT 1', [item.id], function (err, data) {
      if (err) return next(err);

      if (Array.isArray(data) && data.length >= 1) {
        // 公告已存在，更新一下
        db.query('UPDATE `news-main` SET `newsTitle`=?, `newsTime`=? WHERE `newsId`=?', [item.title, item.time, item.id], next);
      } else {
        // 公告不存在，添加
        db.query('INSERT INTO `news-main`(`newsId`, `newsTitle`, `newsTime`) VALUES (?, ?, ?)', [item.id, item.title, item.time], next);
      }
    });

  }, callback);
};

/**
 * 保存公告内容
 */
exports.article = function (id,list, callback) {
  async.eachSeries(list,function (newitem,next) {

    // 查询公告是否已存在
    db.query('SELECT * FROM `news-content` WHERE `newsId`=? LIMIT 1',
      [newitem.id], function (err, data) {
      if (err) return next(err);

      if (Array.isArray(data) && data.length >= 1) {
        // 公告已存在，更新一下
        db.query('UPDATE `news-content` SET `newsContent`=? WHERE `newsId`=?',
          [newitem.content,newitem.id], next);
      } else {
        // 公告不存在，添加
        db.query('INSERT INTO `news-content`(`newsId`, `newsContent`) VALUES (?, ?)',
          [newitem.id,newitem.content], next);
      }
    });

  }, callback);
};

/**
 * 保存公告附件信息
 */
exports.file = function (id,list, callback) {
    async.eachSeries(list, function (item,next) {

        // 查询附件是否已存在
        db.query('SELECT * FROM `news-file` WHERE `fileId`=?',
            [item.fileid], function (err, data) {
                if (err) return next(err);

                if (Array.isArray(data) && data.length >= 1) {
                    // 附件已存在，更新一下
                    db.query('UPDATE `news-file` SET `fileName`=?,`newsId`=? WHERE `fileId`=?',
                        [item.fileName,item.id,item.fileid], next);
                } else {
                    // 附件不存在，添加
                    db.query('INSERT INTO `news-file`(`newsId`, `fileName`,`fileId`) VALUES (?, ?, ?)',
                        [item.id,item.fileName,item.fileid], next);
                }
            });

    }, callback);
};
