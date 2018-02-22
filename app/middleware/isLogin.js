module.exports = options => {
    return async function (ctx, next) {
        const token = ctx.headers['token'];
        const OUT_TIME = 60 * 30;//30分钟
        if (!token) return ctx.throw(401, "登录失效");
        const value = await ctx.app.redis.get(token);
        if (!value) {
            return ctx.error({
                msg: "认证失效",
                status: 419
            });
        }
        ctx._token =value;
        await next();
        //刷新
        await ctx.app.redis.set(token, value, 'EX', OUT_TIME);
    };
};