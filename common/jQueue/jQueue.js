/**
 * Created by SuperKing on 2014/11/6.
 */
var fs = require('fs');

var Queue = require('./Queue');

var queuePool = {};
var authority = 'admin';
var syncTime = 5;
var syncDirectory = '../resources/jQueue/';
var syncInterval = null;
var administrator = 'admin';

function syncQueueToDisk() {
    for (queue in queuePool) {
        var vQueue = eval('queuePool.' + queue);
        if (vQueue instanceof Queue && vQueue.isSync == true) {
            fs.writeFile(syncDirectory + vQueue.name + '.txt', vQueue.queue);
        }
    }
}

module.exports.enQueue = function (aName, aAuthority, aElement) {
    var vRes = '';
    if (aAuthority == authority) {
        if (aName == '' || typeof aName == 'undefined') {
            vRes = 'JQ_PARAM_ERROR';
        }
        else {
            var vQueue = eval('queuePool.' + aName);
            if (!(vQueue instanceof Queue)) {
                vQueue = new Queue(aName);
                eval('queuePool.' + aName + ' = vQueue');
            }
            vRes = vQueue.enQueue(aElement);
        }
    }
    else {
        vRes = 'JQ_AUTH_ERROR';
    }
    return vRes;
};

module.exports.deQueue = function (aName, aAuthority) {
    var vRes = '';
    if (aAuthority == authority) {
        if (aName == '' || typeof aName == 'undefined') {
            vRes = 'JQ_PARAM_ERROR';
        }
        else {
            var vQueue = eval('queuePool.' + aName);
            if (vQueue instanceof Queue) {
                vRes = vQueue.deQueue();
            } else {
                vRes = 'JQ_PARAM_ERROR';
            }
        }
    }
    else {
        vRes = 'JQ_AUTH_ERROR';
    }
    return vRes
};

module.exports.getQueueStatus = function (aName, aAuthority) {
    var vRes = '';
    if (aAuthority == authority) {
        if (aName == '' || typeof aName == 'undefined') {
            vRes = 'JQ_PARAM_ERROR';
        }
        else {
            var vQueue = eval('queuePool.' + aName);
            if (vQueue instanceof  Queue) {
                vRes = vQueue.getQueueStatus();
            }
            else {
                vRes = 'JQ_PARAM_ERROR';
            }
        }
    }
    else {
        return 'JQ_AUTH_ERROR';
    }
};

module.exports.setQueue = function (aName, aAuthority, aOptions) {
    var vRes = '';
    if (aAuthority == authority) {
        if (aName == '' || typeof aName == 'undefined') {
            vRes = 'JQ_PARAM_ERROR';
        }
        else {
            var vQueue = eval('queuePool.' + aName);
            if (vQueue instanceof Queue) {
                vRes = vQueue.setQueue(aOptions);
            }
            else {
                vRes = 'JQ_PARAM_ERROR';
            }
        }
    }
    else {
        return 'JQ_AUTH_ERROR';
    }
};

module.exports.resetQueue = function (aName, aAuthority) {
    var vRes = '';
    if (aAuthority == authority) {
        if (aName == '' || typeof aName == 'undefined') {
            vRes = 'JQ_PARAM_ERROR';
        }
        else {
            var vQueue = eval('queuePool.' + aName);
            if (vQueue instanceof Queue) {
                vRes = vQueue.resetQueue();
            }
            else {
                vRes = 'JQ_PARAM_ERROR';
            }
        }
    }
    else {
        return 'JQ_AUTH_ERROR';
    }
    return vRes;
};

module.exports.getHeadElement = function (aName, aAuthority) {
    var vRes = '';
    if (aAuthority == authority) {
        if (aName == '' || typeof aName == 'undefined') {
            vRes = 'JQ_PARAM_ERROR';
        }
        else {
            var vQueue = eval('queuePool.' + aName);
            if (vQueue instanceof Queue) {
                vRes = vQueue.getHeadElement();
            }
            else {
                vRes = 'JQ_PARAM_ERROR';
            }
        }
    }
    else {
        return 'JQ_AUTH_ERROR';
    }
    return vRes;
};

module.exports.getEndElement = function (aName, aAuthority) {
    var vRes = '';
    if (aAuthority == authority) {
        if (aName == '' || typeof aName == 'undefined') {
            vRes = 'JQ_PARAM_ERROR';
        }
        else {
            var vQueue = eval('queuePool.' + aName);
            if (vQueue instanceof Queue) {
                vRes = vQueue.getEndElement();
            }
            else {
                vRes = 'JQ_PARAM_ERROR';
            }
        }
    }
    else {
        return 'JQ_AUTH_ERROR';
    }
    return vRes;
};

module.exports.getPositionElement = function (aName, aAuthority, aPosition) {
    var vRes = '';
    if (aAuthority == authority) {
        if (aName == '' || typeof aName == 'undefined' || aPosition == '' || aPosition == 'undefined') {
            vRes = 'JQ_PARAM_ERROR';
        }
        else {
            var vQueue = eval('queuePool.' + aName);
            if (vQueue instanceof Queue) {
                vRes = vQueue.getPositionElement(aPosition);
            }
            else {
                vRes = 'JQ_PARAM_ERROR';
            }
        }
    }
    else {
        return 'JQ_AUTH_ERROR';
    }
    return vRes;
};

module.exports.getAllElements = function (aName, aAuthority) {
    var vRes = '';
    if (aAuthority == authority) {
        if (aName == '' || typeof aName == 'undefined') {
            vRes = 'JQ_PARAM_ERROR';
        }
        else {
            var vQueue = eval('queuePool.' + aName);
            if (vQueue instanceof Queue) {
                vRes = vQueue.getAllElements();
            }
            else {
                vRes = 'JQ_PARAM_ERROR';
            }
        }
    }
    else {
        return 'JQ_AUTH_ERROR';
    }
    return vRes;
};

//------------------admin---------------------------------------

module.exports.config = function (aAdministrator, aOptions) {
    if (aAdministrator == administrator) {
        var vAdministrator = aOptions.administrator;
        var vAuthority = aOptions.authority;
        var vSyncTime = aOptions.sync;
        if (typeof vAdministrator != 'undefined') {
            administrator = vAdministrator
        }
        if (typeof vAuthority != 'undefined') {
            authority = vAuthority
        }
        if (typeof vSyncTime != 'undefined') {
            syncTime = vSyncTime
        }
    }
    else {
        return 'JQ_AUTH_ERROR';
    }
};

module.exports.startSync = function (aAdministrator) {
    if (aAdministrator == administrator) {
        if (syncInterval == null) {
            syncInterval = setInterval(syncQueueToDisk, syncTime * 1000);
        }
        return 'JQ_START_OK'
    }
    else {
        return 'JQ_AUTH_ERROR';
    }
};
module.exports.stopSync = function (aAdministrator) {
    if (aAdministrator == administrator) {
        if (syncInterval != null) {
            clearInterval(syncInterval);
            syncInterval = null;
        }
        return 'JQ_STOP_OK'
    }
    else {
        return 'JQ_AUTH_ERROR';
    }
};
