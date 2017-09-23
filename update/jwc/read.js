var originRequest = require('request');
var cheerio = require('cheerio');

/**
 * 请求指定URL
 *
 * @param {String} url
 * @param {Function} callback
 */
function request (url, callback) {
  originRequest(url, callback);
}


/**
 * 获取公告文章列表
 */
exports.newsList = function (callback) {

    request('http://jwc.scu.edu.cn/jwc/frontPage.action', function (err, res) {
        if (err) return callback(err);

        // 根据网页内容创建DOM操作对象
        var $ = cheerio.load(res.body.toString());

        // 读取列表
        var newsList = [];
        $('body').find('table').eq(4).children().each(function () {
            var tableTitle = $(this).children('td').eq(0).children('span').children('a');
            var newsID = $(tableTitle).attr('href').toString().substring(24);
            var newsTitle = $(tableTitle).children('span').eq(0).text();
            var newsTime = $(this).children('td').eq(1).children().text().toString().substring(2, 12);
            var item = {
                title: newsTitle,
                id:  newsID,
                time:newsTime
            };
            newsList.push(item);
        });
        // 返回结果
        callback(null, newsList);
    });
};

/**
 * 依次获取所有公告消息的内容
 */
exports.articleList = function (id, callback) {

  request('http://jwc.scu.edu.cn/jwc/newsShow.action?news.id='+id, function (err, res) {
    if (err) return callback(err);

    // 根据网页内容创建DOM操作对象
    var $ = cheerio.load(res.body.toString());

    // 读取
    var articleList = [];
    var fileList = [];
    $('body').children('table').eq(3).find('tr').each(function () {
        if($(this).find('td').length>1) {
            var TableFile = $(this).children().last().children('a');
            var fileId = TableFile.attr('href').toString().substring(25);
            var fileName = TableFile.text();
            var item = {
                id:   id,
                fileid:   fileId,
                fileName: fileName
            };
            fileList.push(item);
        }
    });
      var newslink = 'http://jwc.scu.edu.cn/jwc/newsShow.action?news.id=' + id;
      var article= $('#news_content').attr('value');
      var newitem = {
          id: id,
          content: article,
          link:newslink
      };
      articleList.push(newitem);
    
    callback(null, articleList,fileList);
  });
};
