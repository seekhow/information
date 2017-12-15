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

    request('http://xsc.scu.edu.cn/', function (err, res) {
        if (err) return callback(err);

        // 根据网页内容创建DOM操作对象
        var $ = cheerio.load(res.body.toString());

        // 读取列表
        var newsList = [];
        $('.u-fx-tzgg').children('ul').children('li').each(function () {
            var tableTitle = $(this).children('a');
            var newsID = $(tableTitle).attr('href').toString().substring(8);
            var newsTitle = $(tableTitle).html();
            //var newsTime = $(this).children('td').eq(1).children().text().toString().substring(2, 12);
            var item = {
                title: newsTitle,
                id:  newsID,
                //time:newsTime
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

  request('http://xsc.scu.edu.cn/P/Info/'+id, function (err, res) {
    if (err) return callback(err);

    // 根据网页内容创建DOM操作对象
    var $ = cheerio.load(res.body.toString());

    // 读取列表
    var articleList = [];
    //var fileList = [];
      var newslink = 'http://xsc.scu.edu.cn/P/Info/' + id;
      var article= $('.v-info-content').html();
      var time = $('.v-info-info').text().toString().substring(22);
      var newitem = {
          id: id,
          content: article,
          link:newslink
      };
      articleList.push(newitem);
    
    callback(null, articleList,time);
  });
};
