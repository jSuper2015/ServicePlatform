/**
 * Created by SuperKing on 2014/10/4.
 */
var mysql = require('mysql');

exports.execute = function (connectionString, sql, callback) {
    var connection = mysql.createConnection(connectionString);
    connection.query(sql, callback);
}

exports.queryByPage = function (connectionString, sql, sortColumn, desc, pageSize, pageIndex, callback) {
    var sqlByPage =
        'select * from ' +
        '( ' +
        '{sql} ' +
        ') as V ' +
        'order by {sortColumn} {desc} limit {rowIndex}, {rowCount} ';
    sqlByPage = sqlByPage.replace('{sql}', sql).replace('{sortColumn}', sortColumn).replace('{desc}', desc)
        .replace('{rowIndex}', pageSize * (pageIndex - 1)).replace('{rowCount}', pageSize);
    this.execute(connectionString, sqlByPage, callback);
}

exports.getDataSet = function (connectionString, sql, option) {
    for (sqlObject in option.sqlList) {
        var sql = "";
        if (sqlObject.isPath) {
            var sqlPath = sqlObject.value;
        }
        else {
            sql = sqlObject.value;
        }
        if (sqlObject.isParameter) {
            for (parameterObject in sqlObject.parameterList) {
                var oldParameter = '{' + parameterObject.key + '}';
                var newParameter = parameterObject.value;
                sql = sql.replace(oldParameter, newParameter);
            }
        }
        if (sqlObject.isFuzzy || sqlObject.isCondition || sqlObject.isAllFuzzy || sqlObject.isAllCondition) {
            var whereSql = " ";
            if (sqlObject.isFuzzy) {
                for (fuzzyObject in sqlObject.fuzzyList) {
                    whereSql += fuzzyObject.key;
                    whereSql += ' like ';
                    whereSql += ' \'%';
                    whereSql += fuzzyObject.value;
                    whereSql += '%\' ';
                    whereSql += ' and ';
                }
            }
            if (sqlObject.isCondition) {
                for (conditionObject in sqlObject.conditionList) {
                    whereSql += conditionObject.key;
                    whereSql += ' = ';
                    whereSql += ' \'';
                    whereSql += conditionObject.value;
                    whereSql += '\' ';
                    whereSql += ' and ';
                }
            }
            if (sqlObject.isAllFuzzy) {
                for (allFuzzyValueObject in sqlObject.allFuzzyValueList) {
                    whereSql += ' ( ';
                    foreach(allFuzzyKeyObject in sqlObject.allFuzzyKeyList)
                    {
                        whereSql += allFuzzyKeyObject;
                        whereSql += ' like ';
                        whereSql += ' \'%';
                        whereSql += allfuzzyValueObject;
                        whereSql += '%\' ';
                        whereSql += ' or ';
                    }
                    whereSql = whereSql.substring(0, sql.length - "or ".length);
                    whereSql += ' ) and ';
                }
            }
            if (sqlObject.isAllCondition) {
                for (allConditionValueObject in sqlObject.allConditionValueList) {
                    whereSql += ' ( ';
                    foreach(allConditionKeyObject in sqlObject.allConditionKeyList)
                    {
                        whereSql += allConditionKeyObject;
                        whereSql += ' like ';
                        whereSql += ' \'%';
                        whereSql += allConditionValueObject;
                        whereSql += '%\' ';
                        whereSql += ' or ';
                    }
                    whereSql = whereSql.substring(0, sql.length - 'or '.length);
                    whereSql += ' ) and ';
                }
            }
            var wherePosition = sql.indexOf('where ');
            if (wherePosition >= 0)
            {
                sql.Insert(wherePosition + 'where '.length, whereSql);
            }
            else
            {
                sql += ' where ';
                sql += whereSql;
                sql = sql.substring(0, sql.length - 'and '.length);
            }
        }
        if (sqlObject.isOrder) {
            var orderSql = ' ';
            for (orderObject in sqlObject.orderList)
            {
                orderSql += orderObject.key;
                orderSql += ' ';
                orderSql += orderObject.value;
                orderSql += ', ';
            }
            //插入排序
            var OrderPosition = sql.indexOf('order by');
            if (OrderPosition >= 0)
            {
                sql.Insert(OrderPosition + 'order by'.Length, orderSql);
            }
            else
            {
                sql += ' order by ';
                sql += orderSql;
                sql = sql.substring(0, sql.length - ', '.length);
            }
        }
    }
    this.execute(connectionString, sql, callback);
}

exports.getDataTable = function () {
};
