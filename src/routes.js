const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();
const singUp = require('./controllers/singUpController');
const singIn = require('./controllers/singInController');
const getUser = require('./controllers/userAuthController');
const authMiddleware = require("./middlewares/auth");






router.get('/user', authMiddleware, getUser);

router.post('/singup', singUp);

router.post('/singin', singIn);



module.exports = router;