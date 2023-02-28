const router = require("koa-router")();
const {
    SuccessModel,
    ErrorModel
} = require("../model/res-model");
const {
    exec
} = require("../db/mysql");
const sql = require("../db/sql");

router.prefix("/api/blog");

router.get("/list", async(ctx, next) => {
    const typeId = ctx.query.typeId;
    const list = await exec(sql.queryBlogTable(typeId));
    ctx.body = new SuccessModel(list);
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
    const body = ctx.request.body;
    const data = await exec(sql.insertBlogData(body));
    ctx.body = new SuccessModel({
        id: data.insertId
    }, "添加成功");
});

router.post("/update", async(ctx, next) => {
    const body = ctx.request.body;
    const data = await exec(sql.updateBlogData(body));
    ctx.body = new SuccessModel("编辑成功");
})

router.post("/delete", async(ctx, next) => {
    const id = ctx.request.body.id;
    await exec(sql.deleteBlogData(id));
    ctx.body = new SuccessModel("删除成功");
})

module.exports = router;