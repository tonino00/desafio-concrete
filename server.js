const Koa = require('koa');
const router = require('./src/routes');
const logger = require('koa-logger');
const mongoose = require("mongoose");
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(logger());


//Mongodb atlas

// mongoose.connect('mongodb://127.0.0.1:27017/desafio', {useNewUrlParser: true })
// .then(()=> 'You are now connect to dataMongo')
// .catch(err => console.error('Someting went wrong', err));


mongoose.connect('mongodb://127.0.0.1:27017/desafio', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB server connect"))
    .catch(e => console.log("DB error", e));


var db = mongoose.connection;

// Added check for DB connection

if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")











app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
const door = process.env.PORT || 3000;
const server = app.listen(door);
module.exports = server;