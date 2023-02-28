const router = require("koa-router")();
const {
    SuccessModel,
    ErrorModel
} = require("../model/res-model");
const {
    exec
} = require("../db/mysql");
const sql = require("../db/sql");

router.prefix("/api/type");

router.get("/list", async(ctx, next) => {
    const list = await exec(sql.queryTypeTable);
    ctx.body = new SuccessModel(list);
});

router.post("/add", async(ctx, next) => {
    const title = ctx.request.body.title;
    const data = await exec(sql.insertTypeData(title));
    ctx.body = new SuccessModel({
        id: data.insertId,
        title
    });
});

router.post("/update", async(ctx, next) => {
    const {
        id,
        title
    } = ctx.request.body;
    await exec(sql.updateTypeData(id, title))
    ctx.body = new SuccessModel("编辑成功");
})

router.post("/delete", async(ctx, next) => {
    const id = ctx.request.body.id;
    await exec(sql.deleteTypeData(id))
    ctx.body = new SuccessModel("删除成功");
})

module.exports = router;