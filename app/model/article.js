module.exports = app => {
    const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
    const Article = app.model.define('article', {
        id: { primaryKey: true, type: STRING(40) },//主键
        title: STRING(40),//标题
        homeImage:STRING(200),//标题图片
        readNum: { type: INTEGER(11), defaultValue: 0 },//阅读量
        commentNum: { type: INTEGER(11), defaultValue: 0 },//评论量
        html: TEXT,//内容
    },{
        underscored:false,
        paranoid: true,
    });
    return Article;
};