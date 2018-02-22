const crypto = require('crypto');
const utils = {};
/**
 * @description 格式化
 * @param {String} fmt yyyy-MM-dd hh:mm:ss    
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
/**
 * @description 错误处理
 * @param {Context} ctx 
 * @param {Object} obj 
 */
utils.error = function (ctx, obj = {}) {
    const body = {
        code: 'server error',
        status: ctx.status,
        message: "error",
        ...obj
    };
    //未满足期望
    if (body.status == 417 || body.status == 412) {
        body.code = 'Expectation failed';
    }
    ctx.status = body.status;
    ctx.response.set("Content-Type", "application/json");
    ctx.res.end(JSON.stringify(body));
}
utils.OParse = function (obj) {
    try {
        return JSON.parse(JSON.stringify(obj))
    } catch (e) {

    }
    return {};
}
utils.is = function () {
    let is = {
        types: ["Array", "Function", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
    };
    for (let i = 0, c; c = is.types[i++];) {
        is[c] = (function (type) {
            return function (obj) {
                if (type === 'Number' && isNaN(obj)) {
                    return false;
                }
                return Object.prototype.toString.call(obj) == "[object " + type + "]";
            }
        })(c);
    }
    return is;
}
utils.encry = function (...args) {
    function $encry(str) {
        const sha256 = crypto.createHash('sha256');
        sha256.update(str);
        return sha256.digest('hex');
    }
    let str = args.join('');
    return $encry($encry(str));
}


module.exports = utils;