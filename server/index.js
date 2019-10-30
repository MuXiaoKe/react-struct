const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const logger = require("koa-logger");
const koaBody = require("koa-body");
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
    ctx.body = res;
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
