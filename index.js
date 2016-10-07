var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

var book = process.argv[2];
var result = [];

app.get('/', function (req, res, next) {
  superagent.get('http://s-e.jd.com/Search?key='+book+'&enc=utf-8')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      result.push({
        'jingdong': ($(".skcolor_ljg").eq(0).text() == book) && (book !== ""),
        'Num': $('*').length
      });
      res.send(result);
    });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
