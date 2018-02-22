//统计时间
module.exports = options => {
    return async function (ctx, next) {
        const start = new Date().getTime();
        await next();
        const ext = new Date().getTime() - start;
        ctx.logger.info(`${ctx.method} ${ctx.url}`);
    };
};