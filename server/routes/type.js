const router = require("koa-router")();
const {
    SuccessModel,
    ErrorModel
} = require("../model/res-model");

router.prefix("/api/type");

router.get("/list", async(ctx, next) => {
    ctx.body = new SuccessModel([{
        id: 0,
        title: "iOS",
    }, {
        id: 1,
        title: "Flutter",
    }, {
        id: 2,
        title: "JavaScript",
    }, {
        id: 3,
        title: "Vue",
    }, {
        id: 4,
        title: "Node.js",
    }]);
});

router.post("/add", async(ctx, next) => {
    const title = ctx.request.body.title;
    ctx.body = new SuccessModel("添加成功:" + title);
});

router.post("/update", async(ctx, next) => {
    const {
        id,
        title
    } = ctx.request.body;
    ctx.body = new SuccessModel("编辑成功:" + id + " " + title);
})

router.post("/delete", async(ctx, next) => {
    const id = ctx.request.body.id;
    ctx.body = new SuccessModel("删除成功:" + id);
})

module.exports = router;