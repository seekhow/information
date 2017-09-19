/**
 * Created by seekhow on 2017/8/24.
 */
var async = require('async');
var data = require('./data');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.sendfile('./public/index.html');
    });
    app.get('/api/jwc/show', function (req, res) {
        data.newsList(function (err, list) {
            //console.log(list);
            res.send(list);
        });
    });
    app.get('/api/jwc/:id', function (req, res) {
        var newsID = req.params.id;
        var news=[];
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
    });
    app.get('/api/test', function (req, res) {
        res.send('test');
    });
};
