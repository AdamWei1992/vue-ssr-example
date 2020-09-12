
const ejs = require('ejs');

module.exports = async (ctx, renderer, template) => {
    ctx.headers['Content-Type'] = 'text/html';

    const context = {
        url: ctx.path,
        user: ctx.session.user
    };
    // console.log('ctx.path', ctx.path)
    try {
        const appString = await renderer.renderToString(context);
        // 如果当前页面没登录，服务端需要重定向到新的页面
        if (context.router.currentRoute.fullPath !== ctx.path) {
            return ctx.redirect(context.router.currentRoute.fullPath);
        }
        // console.log('appString---', appString)
        const {title} = context.meta.inject();

        const html = ejs.render(template, {
            appString,
            style: context.renderStyles(),
            scripts: context.renderScripts(),
            title: title.text(),
            initalState: context.renderState()
        });

        ctx.body = html;
    } catch (error) {
        console.log('render error', error)
    }
}
