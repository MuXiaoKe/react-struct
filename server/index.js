const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const logger = require('koa-logger');
const koaBody = require('koa-body');
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
router.get("/qqq", (ctx, next) => {
    // ctx.router available
    console.log(ctx.request, ctx.query) // JSON.stringify(ctx.request.body)
    db.insertData(ctx.query)
    db.findData()
    ctx.body = ctx.query.content;
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
