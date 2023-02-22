const router = require("koa-router")();
const {
    SuccessModel,
    ErrorModel
} = require("../model/res-model");

router.prefix("/api/blog");

router.get("/list", async(ctx, next) => {
    ctx.body = new SuccessModel([{
        id: 0,
        image: "favicon.ico",
        time: "2022-00-00 11:11:11",
        title: "iOS上架流程",
        preview: "最新的iOS上架流程",
        type: "iOS",
    }]);
});

router.get("/detail", async(ctx, next) => {
    const id = ctx.query.id;
    ctx.body = new SuccessModel({
        id,
        image: "favicon.ico",
        time: "2022-00-00 11:11:11",
        title: "iOS上架流程",
        preview: "最新的iOS上架流程",
        type: "iOS",
        content: "# 1首先要"
    });
});

router.post("/add", async(ctx, next) => {
    const {
        image,
        title,
        preview,
        typeId,
        content
    } = ctx.request.body;
    ctx.body = new SuccessModel({
        id: 0,
        image,
        title,
        preview,
        typeId,
        content
    });
});

router.post("/update", async(ctx, next) => {
    const {
        id,
        image,
        title,
        preview,
        content
    } = ctx.request.body;
    ctx.body = new SuccessModel({
        id,
        image,
        title,
        preview,
        content
    });
})

router.post("/delete", async(ctx, next) => {
    const id = ctx.request.body.id;
    ctx.body = new SuccessModel("删除成功:" + id);
})

module.exports = router;