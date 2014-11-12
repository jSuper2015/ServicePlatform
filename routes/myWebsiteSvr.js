/**
 * Created by SuperKing on 2014/10/3.
 */
var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (request, response) {
    var vRes = '个人网站服务端';
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end()
});

