
const validator = require('async-validator');
module.exports = app => {
    app.validator = validator;
    if (app.config.env === 'local') {
        initModel(app);
    }
};

function initModel(app) {
    let { Article, Users, Comment } = app.model;
    app.beforeStart(async () => {
        //同步模型{force: true} 强制同步 先删除再创建
        Users.hasMany(Article);
        Article.hasMany(Comment);
        await app.model.sync({ alter: true });
    });
}