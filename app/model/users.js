module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const User = app.model.define('users', {
        id: { primaryKey: true, type: STRING(40) },//主键
        username: STRING(30),//账号
        password: STRING(80),//密码
        phone: STRING(12),//手机
    },{
        underscored:false,
        paranoid: true,
    });
    return User;
};