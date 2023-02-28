const router = require("koa-router")();
const jwt = require("jsonwebtoken");
const {
    exec,
    escape
} = require("../db/mysql");
const sql = require("../db/sql");

const {
    SuccessModel,
    ErrorModel
} = require("../model/res-model");

router.prefix("/api/user");

router.post("/login", async(ctx, next) => {
    const {
        username,
        password
    } = ctx.request.body;
    const result = await exec(sql.queryUserData(escape(username), escape(password)));
    if (result.length !== 0) {
        const token = jwt.sign({
            username
        }, "blog", {
            expiresIn: "1d"
        });
        ctx.body = new SuccessModel({
            token
        }, "登录成功！");
    } else {
        ctx.body = new ErrorModel("账号或密码不正确！");
    }
});

module.exports = router;