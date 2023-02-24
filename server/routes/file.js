const router = require("koa-router")();
const {
    koaBody
} = require("koa-body")

const {
    SuccessModel
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

module.exports = router;