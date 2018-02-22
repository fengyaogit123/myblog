//用户
'use strict';
const Controller = require('egg').Controller;
module.exports = class UserController extends Controller {
    async create() {
        const rule = {
            username: { type: "string", required: true, message: "请输入用户名" },
            password: { type: "string", required: true, message: "请输入密码" }
        }
        this.ctx.validate(rule);
        this.ctx.body = await this.service.users.create();
    }
}
