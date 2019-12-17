const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

const singUp = require('./controllers/singUpController');
const singIn = require('./controllers/singInController');



router.get('/singin', singIn);

router.post('/singup', singUp);

router.post('/singin', singIn);






module.exports = router;