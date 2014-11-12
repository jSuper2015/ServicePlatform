/**
 * Created by SuperKing on 2014/10/23.
 */
var express = require('express');
var router = express.Router();

var jQueue = require('../common/jQueue/jQueue');

var undefined;

module.exports = router;

router.get('/en', function (aRequest, aResponse) {
    var vRes = '';
    var vName = aRequest.query.name;
    var vAuthority = aRequest.query.auth;
    var vElement = aRequest.query.ele;
    vRes = jQueue.enQueue(vName, vAuthority, vElement);
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});
router.get('/de', function (aRequest, aResponse) {
    var vRes = '';
    var vName = aRequest.query.name;
    var vAuthority = aRequest.query.auth;
    vRes = jQueue.deQueue(vName, vAuthority);
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});

router.get('/status', function (aRequest, aResponse) {
    var vRes = '';
    var vName = aRequest.query.name;
    var vAuthority = aRequest.query.auth;
    vRes = jQueue.getQueueStatus(vName, vAuthority);
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});

router.get('/set', function (aRequest, aResponse) {
    var vRes = '';
    var vName = aRequest.query.name;
    var vAuthority = aRequest.query.auth;
    var vOptions = {};
    vOptions.isSync = aRequest.query.sync;
    vOptions.maxLength = aRequest.query.max;
    vRes = jQueue.setQueue(vName, vAuthority, vOptions);
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});

router.get('/reset', function (aRequest, aResponse) {
    var vRes = '';
    var vName = aRequest.query.name;
    var vAuthority = aRequest.query.auth;
    vRes = jQueue.resetQueue(vName, vAuthority);
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});

router.get('/head', function (aRequest, aResponse) {
    var vRes = '';
    var vName = aRequest.query.name;
    var vAuthority = aRequest.query.auth;
    vRes = jQueue.getHeadElement(vName, vAuthority);
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});

router.get('/end', function (aRequest, aResponse) {
    var vRes = '';
    var vName = aRequest.query.name;
    var vAuthority = aRequest.query.auth;
    vRes = jQueue.getEndElement(vName, vAuthority);
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});

router.get('/pos', function (aRequest, aResponse) {
    var vRes = '';
    var vName = aRequest.query.name;
    var vAuthority = aRequest.query.auth;
    var vPosition = aRequest.query.pos;
    vRes = jQueue.getPositionElement(vName, vAuthority, vPosition);
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});

router.get('/all', function (aRequest, aResponse) {
    var vRes = '';
    var vName = aRequest.query.name;
    var vAuthority = aRequest.query.auth;
    vRes = jQueue.getAllElements(vName, vAuthority);
    aResponse.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});

router.get('/config', function (aRequest, aResponse) {
    var vRes = '';
    var vAdministrator = aRequest.query.administrator;
    var vOptions = {};
    vOptions.administrator = aRequest.query.administrator;
    vOptions.authority = aRequest.query.authority;
    vOptions.syncTime = aRequest.query.sync;
    vRes = jQueue.config(vAdministrator, vOptions);
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});

router.get('/start', function (aRequest, aResponse) {
    var vRes = '';
    var vAdministrator = aRequest.query.administrator;
    vRes = jQueue.startSync(vAdministrator);
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});

router.get('/stop', function (aRequest, aResponse) {
    var vRes = '';
    var vAdministrator = aRequest.query.administrator;
    vRes = jQueue.stopSync(vAdministrator);
    aResponse.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    aResponse.write(vRes);
    aResponse.end();
});
