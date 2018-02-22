const utils = require('../../utils/utils')
const UUID = require('uuid/v1');
module.exports = {
    //加密
    encry: utils.encry,
    UUID(){
        return UUID().replace(/-/g,'');
    },
    //分页
    async getPage({ pageNo = 0, size = 20 } = {}, callback = function () { }) {
        pageNo = +pageNo;
        size = +size;
        if (!utils.is().Number(pageNo)) pageNo = 0;
        if (!utils.is().Number(size)) size = 20;
        if (pageNo < 0) pageNo = 0;
        if (size <= 0) size = 20;
        if (size > 1000) size = 1000;
        const result = await callback({
            pageNo,
            limit: size,
            offset: pageNo * size,
            end: (pageNo + 1) * size
        });
        result.size = size;
        result.pageNo = pageNo;
        result.pageSize = Math.ceil(result.count / size);
        return result;
    },
    is: utils.is
};