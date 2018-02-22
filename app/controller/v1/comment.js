//评论
'use strict';
const Controller = require('egg').Controller;
module.exports = class CommentController extends Controller {
    async create() {
        const rule = {
            articleId: { type: "string", required: true, message: "请选择文章" },
            html: { type: "string", required: true, message: "评论内容不能为空" },
        }
        this.ctx.validate(rule);
        this.ctx.body = await this.service.comment.create();
    }
    async byArticle() {
        let { id } = this.ctx.params;
        const rule = {
            id: { type: "string", required: true, message: "文章id不能为空" },
        }
        this.ctx.validate(rule, { id });
        this.ctx.body = await this.service.comment.byArticle(id);
    }
}
