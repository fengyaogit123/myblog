const Service = require('egg').Service;
module.exports = class CommentService extends Service {
    async create(comment) {
        const { Article } = this.ctx.model;
        comment = comment || this.ctx.request.body;
        comment.id = this.ctx.helper.UUID();
        const article = await Article.findById(comment.articleId);
        if (article) {
            return await article.createComment(comment);
        }
        return this.ctx.throw(412, "文章不存在")
    }
    /**
     * @description byArticle
     * @param {String} id 
     */
    async byArticle(id) {
        const { getPage } = this.ctx.helper;
        const result = await getPage(this.ctx.query, async ({ offset, limit }) => {
            return await this.ctx.model.Comment.findAndCountAll({
                where: { article_id: id },
                order: ['updated_at'],
                offset,
                limit
            });
        });
        return result;
    }
}