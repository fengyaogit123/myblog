//文章
'use strict';
const Controller = require('egg').Controller;
module.exports = class ArticleController extends Controller {
    async byUser() {
        let { id } = this.ctx.params;
        const rule = {
            id: { type: "string", required: true, message: "用户id不能为空" },
        }
        this.ctx.validate(rule, { id });
        this.ctx.body = await this.service.article.byUser(id);
    }
    async show() {
        let { id } = this.ctx.params;
        const rule = {
            id: { type: "string", required: true, message: "文章id不能为空" },
        }
        this.ctx.validate(rule, { id });
        const result = await this.service.article.show(id);
        this.ctx.body = result;
        await result.increment('readNum', { by: 1 });
    }
    async create() {
        const rule = {
            userId: { type: "string", required: true, message: "用户不存在" },
            title: { type: "string", required: true, message: "请填写标题" }
        }
        const article = {
            userId: this.ctx._token,
            title: this.ctx.request.body && this.ctx.request.body.title
        }
        this.ctx.validate(rule, article);
        this.ctx.body = await this.service.article.create({ ...this.ctx.request.body, ...article });
    }
    async update(){
        let { id } = this.ctx.params;
        const rule = {
            id: { type: "string", required: true, message: "文章id不能为空" },
        }
        this.ctx.validate(rule, { id });
        this.ctx.body = await this.service.article.update(id,this.ctx.request.body);
    }
}
