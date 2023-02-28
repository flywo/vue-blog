const router = require("koa-router")();
const {
    SuccessModel,
    ErrorModel
} = require("../model/res-model");
const {
    exec
} = require("../db/mysql");
const sql = require("../db/sql");
const { removeNoUseImage } = require("../utils/tool");

router.prefix("/api/blog");

router.get("/list", async(ctx, next) => {
    const typeId = ctx.query.typeId;
    const list = await exec(sql.queryBlogTable(typeId));
    removeNoUseImage(list);
    ctx.body = new SuccessModel(list);
});

router.get("/detail", async(ctx, next) => {
    const id = ctx.query.id;
    const list = await exec(sql.querySingleBlog(id));
    if (list.length > 0) {
        ctx.body = new SuccessModel(list[0]);
    } else {
        ctx.body = new ErrorModel("博客不存在");
    }
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