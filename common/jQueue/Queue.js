/**
 * Created by SuperKing on 2014/10/24.
 */

module.exports = Queue;

/*
 * 定义队列类
 */
function Queue(aName) {
    this.queue = [];
    this.name = aName;
    this.maxLength = 1000;
    this.isSync = false;
}
/*
 * 元素入队
 */
Queue.prototype.enQueue = function (aElement) {
    if (this.queue.length < this.maxLength) {
        this.queue.push(aElement);
        return 'JQ_EN_OK';
    }
    else {
        return 'JQ_EN_END';
    }
};
/*
 * 元素出队
 */
Queue.prototype.deQueue = function () {
    if (this.queue.length > 0) {
        return this.queue.shift();
    }
    else {
        return 'JQ_DE_END';
    }
};
/*
 * 获取队列状态
 */
Queue.prototype.getQueueStatus = function () {
    var vStatus = {};
    vStatus.name = this.name;
    vStatus.length = this.queue.length;
    vStatus.maxLength = this.maxLength;
    vStatus.isSync = this.isSync;
    return vStatus;
};
/*
 * 设置队列
 */
Queue.prototype.setQueue = function (aOptions) {
    var vMaxLength = aOptions.maxLength;
    var vIsSync = aOptions.isSync;
    if (typeof vMaxLength != 'undefined') {
        this.maxLength = vMaxLength;
    }
    if (typeof vIsSync != 'undefined') {
        this.isSync = vIsSync;
    }
    return 'JQ_SET_OK';
};
/*
 * 重置队列
 */
Queue.prototype.resetQueue = function () {
    this.queue = [];
    this.maxLength = 1000;
    this.isSync = false;
    return 'JQ_RESET_OK'
};
/*
 * 返回队头素
 */
Queue.prototype.getHeadElement = function () {
    if (this.queue.length > 0) {
        return this.queue[0];
    }
    else {
        return 'JQ_GET_END';
    }
}
;
/*
 * 返回队尾素
 */
Queue.prototype.getEndElement = function () {
    if (this.queue.length > 0) {
        return this.queue[this.queue.length - 1];
    }
    else {
        return 'JQ_GET_END';
    }
};
/*
 * 返回位置元素
 */
Queue.prototype.getPositionElement = function (aPosition) {
    if (this.queue.length >= aPosition) {
        return this.queue[aPosition - 1];
    }
    else {
        return 'JQ_GET_END';
    }
};
/*
 * 返回所有元素
 */
Queue.prototype.getAllElements = function () {
    if (this.queue.length > 0) {
        return this.queue;
    }
    else {
        return 'JQ_GET_END';
    }
};

