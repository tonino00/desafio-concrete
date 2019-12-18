const jwt = require("jsonwebtoken");
const {
  promisify
} = require("util");

module.exports = async (ctx) => {

  const authHeader = ctx.request.headers.authorization;

  if (!authHeader) {
    ctx.status = 401;
    ctx.body = "Sessão inválida"
    return
  }
    

  const {
    token
  } = authHeader.split(" ");


  try {
    const decoded = await promisify(jwt.verify)(token, "secret");

    ctx.request.userId = decoded.id;

    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = "Não autorizado"
  }
};