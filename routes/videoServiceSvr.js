/**
 * Created by SuperKing on 2014/10/3.
 */
var express = require('express');
var router = express.Router();

var mApp = require('../modules/videoService/mApp');
var mSport = require('../modules/videoService/mSport');
var mVideo = require('../modules/videoService/mVideo');

module.exports = router;

router.get('/', function (aRequest, aResponse) {
    var vRes = '综合视频服务平台服务端';
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end()
});

router.get('/app', function (aRequest, aResponse) {
    var vRes = '综合视频服务平台服务端';
    var vCmdID = aRequest.query.cmdID;
    var vCmdParameter = aRequest.query.cmdParam;
    vRes = eval('mApp.' + vCmdID + '(vCmdParameter)');
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end()
});
router.get('/sport', function (aRequest, aResponse) {
    var vRes = '综合视频服务平台服务端';
    var vCmdID = aRequest.query.cmdID;
    var vCmdParameter = aRequest.query.cmdParam;
    vRes = eval('mSport.' + vCmdID + '(vCmdParameter)');
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end()
});
router.get('/video', function (aRequest, aResponse) {
    var vRes = '综合视频服务平台服务端';
    var vCmdID = aRequest.query.cmdID;
    var vCmdParameter = aRequest.query.cmdParam;
    vRes = eval('mVideo.' + vCmdID + '(vCmdParameter)');
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end()
});


