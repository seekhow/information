// MySQL数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
  host:            '127.0.0.1',   // 数据库地址
  port:            3306,          // 数据库端口
  database:        'news',   // 数据库名称
  user:            'ylx',        // 数据库用户
  password:        'ylx'             // 数据库用户对应的密码
});

exports.page = {
  url: 'http://jwc.scu.edu.cn/jwc/frontPage.action'
};

// 定时更新
exports.autoUpdate = '* */30 * * *';  // 任务执行规则，参考 cron 语法
