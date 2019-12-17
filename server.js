const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const logger = require('koa-logger');
const app = new Koa();
app.use(logger());

// Routes 
router.get('/', (ctx, next) => {
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);