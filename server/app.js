const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require('koa-jwt')

const {
    ErrorModel
} = require("./model/res-model");

const user = require("./routes/user");
const type = require("./routes/type");
const blog = require("./routes/blog");

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next().catch(err => {
        if (err.status == "401") {
            ctx.status = 200;
            ctx.body = new ErrorModel("登录超时，请重新登录！");
        } else {
            throw err;
        }
    })
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(koajwt({
    secret: 'blog'
}).unless({
    path: ["/api/user/login", "/api/type/list", "/api/blog/list", "/api/blog/detail", ]
}));

app.use(user.routes(), user.allowedMethods());
app.use(type.routes(), type.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app