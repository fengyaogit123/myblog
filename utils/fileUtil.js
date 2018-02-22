const fs = require('fs');
const utils = {};
//创建文件目录
utils.createdDir = async function (dir) {
    if (fs.existsSync(dir)) {
        return true;
    }
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, (error) => {
            if (error) {
                return reject(error)
            }
            resolve();
        });
    })
}

module.exports = utils;