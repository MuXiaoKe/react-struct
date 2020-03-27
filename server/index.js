const Koa = require("koa");
const Router = require("koa-router"); // 路由
const cors = require("koa2-cors");  // 跨域
const logger = require("koa-logger"); // koa-logger提供了输出请求日志的功能，包括请求的url、状态码、响应时间、响应体大小等信息
const koaBody = require("koa-body"); // 解析请求体
const db = require("./db.js");
const app = new Koa();
app.use(cors());
app.use(logger());
app.use(koaBody());
// app.use(async ctx => {
//     ctx.body = 'Hello World';
// });
const router = new Router();

router.get("/", (ctx, next) => {
    // ctx.router available
    ctx.body = "Hello World11";
});
router.get("/api/addList",async (ctx, next) => {
    await db.insertData("myDb", "todolist", ctx.query);
    const res = await db.findData("myDb", "todolist");
    ctx.body = res;
});
router.get("/api/getList", async (ctx, next) => {
    // db.insertData(ctx.query)
    const res = await db.findData("myDb", "todolist");
    ctx.body = {
        data: res,
        success: true,
        errorCode: null,
        msg: null
    };
});
router.get("/api/deleteList", async (ctx, next) => {
    // db.insertData(ctx.query)
    const res = await db.deleteData("myDb", "todolist", ctx.query);
    ctx.body = res;
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
