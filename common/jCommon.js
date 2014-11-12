/**
 * Created by SuperKing on 2014/10/30.
 */

exports.getType = function (aVar) {
    if (typeof aVar != 'object') {
        return typeof aVar;
    } else if (aVar == null) {
        return 'null';
    } else if (aVar.constructor) {
        return aVar.constructor.name;
    } else {
        return 'Unknow Type';
    }
};