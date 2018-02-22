'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, middlewares } = app;
    const { isLogin } = middlewares;
    //登录
    router.post('/api/v1/login', 'v1.login.login');
    //用户
    router.post('/api/v1/users', isLogin(), 'v1.users.create')
    //文章
    router.get('/api/v1/article/:id', 'v1.article.show')
    router.put('/api/v1/article/:id', 'v1.article.update')
    router.get('/api/v1/article/byuser/:id', 'v1.article.byUser')
    router.post('/api/v1/article', isLogin(), 'v1.article.create')
    //评论
    router.post('/api/v1/comment', 'v1.comment.create');
    router.get('/api/v1/comment/byArticle/:id', 'v1.comment.byArticle');
    //上传
    router.post('/api/v1/upload/image', isLogin(), 'v1.upload.image')
    router.post('/api/v1/upload/editor', 'v1.upload.editor')
};
