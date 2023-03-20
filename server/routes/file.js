const router = require("koa-router")();
const {
    koaBody
} = require("koa-body")
const fs = require("fs");
const {
    removeNoUseImage
} = require("../utils/tool");
const {
    exec
} = require("../db/mysql");
const sql = require("../db/sql");

const {
    SuccessModel,
    ErrorModel
} = require("../model/res-model");

router.prefix("/api/file");

router.post("/upload", koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000 * 1024 * 1024,
        uploadDir: 'upload/',
        multiples: false,
        keepExtensions: true
    }
}), async(ctx, next) => {
    const file = ctx.request.files.file;
    ctx.body = new SuccessModel({
        path: file.newFilename
    });
});

router.post("/delete", async(ctx, next) => {
    const filename = ctx.request.body.filename;
    ctx.body = await new Promise((resolve, reject) => {
        fs.unlink(__dirname + "/.." + filename, error => {
            if (error) {
                resolve(new ErrorModel("文件删除失败！"));
            } else {
                resolve(new SuccessModel("文件删除成功！"));
            }
        });
    });
});

router.get("/clear", async(ctx, next) => {
    const list = await exec(sql.queryAllBlog());
    removeNoUseImage(list);
    ctx.body = new SuccessModel("清理成功");
});

module.exports = router;