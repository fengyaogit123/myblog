//登录
'use strict';
const Controller = require('egg').Controller;
module.exports = class LoginController extends Controller {
    async login() {
        const OUT_TIME = 60 * 30;//30分钟
        const rule = {
            username: [{ type: "string", required: true, message: "请输入用户名" }],
            password: [{ type: "string", required: true, message: "请输入密码" }]
        }
        this.ctx.validate(rule);
        const result = await this.service.users.login();
        //生成token
        const token = this.ctx.helper.encry(Date.now(), result.username, result.password);
        //保存token到redis 并设置半小时过期时间
        await this.app.redis.set(token,result.id, 'EX', OUT_TIME);
        this.ctx.body = {
            token,
            data: result
        };
    }
}
