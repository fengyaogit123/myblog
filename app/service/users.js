// app/service/user.js
const Service = require('egg').Service;
module.exports = class UserService extends Service {
    /**
     * @description 新增用户
     * @param {Object} user 
     */
    async create(user) {
        user = user || this.ctx.request.body;
        const findUser = await this.findByName(user.username);
        if (findUser.length == 0) {
            user.id = this.ctx.helper.UUID();
            user.password = this.ctx.helper.encry(user.password,user.password,'fy');
            return await this.ctx.model.Users.create(user);
        }
        return this.ctx.throw(412, "用户已存在")
    }
    /**
     * @description 根据username查找user
     * @param {String} username 
     * @returns {Array} users
     */
    async findByName(username) {
        return await this.ctx.model.Users.findAll({
            attributes: ['username'],
            where: {
                username
            }
        });
    }
    /**
     * @description 根据phone查找user
     * @param {String} phone 
     * @returns {Array} users
     */
    async findByPhone(phone) {
        return await this.ctx.model.Users.findAll({
            attributes: ['phone'],
            where: {
                phone
            }
        });
    }
    /**
     * @description 根据用户名密码登录
     * @param {Object} -{username, password} 
     * @returns {Array} users
     */
    async findByLogin({ username, password }) {
        return await this.ctx.model.Users.findAll({
            attributes: { exclude: ['password'] },
            where: {
                username,
                password
            }
        });
    }
    /**
     * @description 登录
     */
    async login() {
        let { Users } = this.ctx.model;
        let user = this.ctx.request.body;
        user.password = this.ctx.helper.encry(user.password,user.password,'fy');
        const findUser = await this.findByLogin(user);
        if (findUser.length > 0) {
            return findUser[0];
        }
        return this.ctx.throw(412, "用户名或密码不正确")
    }
}
