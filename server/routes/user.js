
const Router = require('koa-router');

const userRouter = new Router({prefix: '/user'})

userRouter.post('/login', async ctx => {
    const user = ctx.request.body;
    if (user.username === 'jokcy' && user.password === '123') {
        ctx.session.user = {
            username: 'jokcy'
        };
        ctx.body = {
            success: true,
            data: {
                username: 'jokcy'
            }
        };
    } else {
        ctx.status = 400;
        ctx.body = {
            success: false,
            message: 'login error'
        };
    }
})

module.exports = userRouter;
