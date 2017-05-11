/**
 * @file 电子书爬虫
 *
 * @author thu（thufelixc@gmail.com）
 */

// 准备支持的平台有
// 京东，当当，百度，多看，kindle，微信，豆瓣
// 不准备支持的平台
// QQ，淘宝，网易云阅读
// 观望中的平台
// 网易蜗牛读书

var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

var result = [];

// 设置跨域访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.post('/', function (req, res, next) {
    result = [];
    var book = req.body.bookName;
    superagent.get('http://s-e.jd.com/Search?key=' + book + '&enc=utf-8').end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            // 取到内部标志该书的号码
            var id = $('.ebook_price').eq(0).next().attr('id');
            superagent.get('http://p.3.cn/prices/mgets?skuids=' + id).end(function (err, sres) {
                console.log(sres);
            });
            result.push({
                name: 'jingdong',
                result: ($('.skcolor_ljg').eq(0).text() === book) && (book !== '')
            });
            res.send(result);
        });
});


app.listen(3000, function () {
    console.log('app is listening at port 3000');
});

