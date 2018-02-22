'use strict';
const utils = require('../utils/utils');
module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1516533966144_7741';

    // add your config here
    config.middleware = ['countTime'];
    //mysql
    config.sequelize = {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: 'myblog',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '123456',
    };
    //web安全
    config.security = {
        csrf: {
            enable: false,
        },
    }
    //全局错误处理
    config.onerror = {
        all(err, ctx) {
            ctx.error({
                code:err.code,
                message:err.message
            });
        }
    }
    //redis
    config.redis = {
        client: {
            port: 6379,          // Redis port
            host: '127.0.0.1',   // Redis host
            password: 'auth',
            db: 0,
        },
    }
    config.multipart = {
        fileSize: '2mb',
    };
    return config;
};
