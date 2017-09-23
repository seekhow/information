var db = require('./update/config').db;

/**
 * 获取公告列表
 */
exports.newsList = function (site,callback) {
    db.query('SELECT * FROM `news-main` WHERE `newsSite`=? ORDER BY `newsId` DESC',[site], callback);
};
/**
 * 获取公告标题
 */
exports.newsTitle = function (site,id,callback) {
    db.query('SELECT * FROM `news-main` WHERE `newsId`=? AND `newsSite`=? LIMIT 1',[id,site], callback);
};
/**
 * 获取公告内容
 */
exports.newsContent = function (site,id,callback) {
    db.query('SELECT * FROM `news-content` WHERE `newsId`=? AND `newsSite`=? LIMIT 1',[id,site], callback);
};
/**
 * 获取公告附件
 */
exports.newsFile = function (site,id,callback) {
    db.query('SELECT * FROM `news-file` WHERE `newsId`=? AND `newsSite`=?',[id,site], callback);
};
