const Joi = require('@hapi/joi');
const User = require('../models/User');



const singInschema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        })
        .required(),

    senha: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
})

async function singIn(ctx) {
    try {


        await singInschema.validateAsync(ctx.request.body);

        const {
            email,
            senha
        } = ctx.request.body;

        let user = await User.findOne({
            email
        });

        if (!user) {
            return ctx.status(401).json({
                error: "Usuário não encontrado"
            });
        }

        if (!(await user.compareHash(senha))) {
            return ctx.status(401).json({
                error: "Senha inválida"
            });
        }

        user.geolocation = await user.generationLocation();
        user.token = user.generateToken();

        ctx.body = user;

    } catch (err) {
        console.log(err)
    }
}




module.exports = singIn;