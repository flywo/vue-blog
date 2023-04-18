const router = require("koa-router")();
const {
    SuccessModel,
    ErrorModel
} = require("../model/res-model");
const {
    exec
} = require("../db/mysql");
const sql = require("../db/sql");

router.prefix("/api/soup");

router.get("/one", async(ctx, next) => {
    const one = await exec(sql.querySoupOne);
    ctx.body = new SuccessModel(one[0]);
});

module.exports = router;