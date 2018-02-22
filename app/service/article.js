const Service = require('egg').Service;
module.exports =  class ArticleService extends Service {
    /**
     * @description 根据userId 获取文章列表
     * @param {String} userId 
     * @returns {Article<Array>} Articles
     */
    async byUser(userId) {
        const { getPage } = this.ctx.helper;
        const result = await getPage(this.ctx.query, async ({ offset, limit }) => {
            return await this.ctx.model.Article.findAndCountAll({
                where: { userId },
                offset,
                limit
            });
        });
        return result;
    }
    /**
     * @description 根据id 获取文章详情
     * @param {String} id 
     * @returns {Article}
     */
    async show(id) {
        return await this.ctx.model.Article.findById(id);
    }
    /**
     * @description 创建文章
     * @param {Object} article 
     * @returns {Article}
     */
    async create(article) {
        const { Users } = this.ctx.model;
        article = article || this.ctx.request.body;
        article.id = this.ctx.helper.UUID();
        const user = await Users.findById(article.userId);
        if (user) {
            return await user.createArticle(article);
        }
        return this.ctx.throw(412, "用户不存在")
    }

    async update(id,params){
        const { Article } = this.ctx.model;
        const article = await this.ctx.model.Article.findById(id);
        if(!article) return this.ctx.throw(412, "文章不存在");
        await article.update(params);
    }
}