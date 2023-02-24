const router = require("koa-router")();
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
        ctx.body = new SuccessModel("登录成功！");
    } else {
        ctx.body = new ErrorModel("账号或密码不正确！");
    }
});

module.exports = router;