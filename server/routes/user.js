const router = require("koa-router")();
const jwt = require("jsonwebtoken");

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
    if (username === "yuhua" && password === "yuhua") {
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