var db = require('./update/config').db;

/**
 * 获取公告列表
 */
exports.newsList = function (callback) {
    db.query('SELECT * FROM `news-main` ORDER BY `newsId` DESC', callback);
};
/**
 * 获取公告列表
 */
exports.newsTitle = function (id,callback) {
    db.query('SELECT * FROM `news-main` WHERE `newsId`=? LIMIT 1',[id], callback);
};
/**
 * 获取公告内容
 */
exports.newsContent = function (id,callback) {
    db.query('SELECT * FROM `news-content` WHERE `newsId`=? LIMIT 1',[id], callback);
};
/**
 * 获取公告附件
 */
exports.newsFile = function (id,callback) {
    db.query('SELECT * FROM `news-file` WHERE `newsId`=?',[id], callback);
};
