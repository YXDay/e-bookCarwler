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

let express = require('express');
let cheerio = require('cheerio');
let superagent = require('superagent');

let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

let result = [];

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
    let book = req.body.bookName;
    let jingdongPromise = new Promise(function (resolve, reject) {
        superagent.get('http://s-e.jd.com/Search?key=' + book + '&enc=utf-8').end(function (err, sres) {
            if (err) {
                return next(err);
            }
            let $ = cheerio.load(sres.text);
            let price = Number.MAX_VALUE;
            // 取到内部标志该书的号码
            let id = $('.ebook_price').eq(0).next().attr('id');
            if (id) {
                superagent.get('http://p.3.cn/prices/mgets?skuids=' + id).end(function (err, sres) {
                    price = JSON.parse(sres.text)[0].p;
                    result.push({
                        name: 'jingdong',
                        price: price
                    });
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    });
    let allDone = Promise.all([jingdongPromise]);
    allDone.then(function (value) {
        res.send(result);
    });
});


app.listen(3000, function () {
    console.log('app is listening at port 3000');
});

