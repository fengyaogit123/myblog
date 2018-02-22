module.exports = app => {
    const { STRING, INTEGER, DATE ,TEXT} = app.Sequelize;
    const Comment = app.model.define('comment', {
        id: { primaryKey: true, type: STRING(40) },//主键
        html:TEXT,//内容
    },{
        underscored:false,
        paranoid: true,
    });
    return Comment;
};