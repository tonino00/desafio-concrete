const Joi = require('@hapi/joi');
const User = require('../models/User');
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyB6lHSF83SypD6_LHTWaxOMLbfoe_Xt7D8',
    Promise
});



const singUpschema = Joi.object({
    nome: Joi.string()
             .required()
             .description('Nome do usuário'),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        })
        .required()
        .description('E-mail'),

    senha: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),

    telefones: Joi.array().items(Joi.object({
        numero: Joi.string().pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).required(),
        ddd: Joi.string().optional()
    })),

    cep: Joi.string()
        .pattern(/^\d{5}-\d{3}$/)
        .required(),

})

async function myGeolocation() {
    const response = await googleMapsClient.geocode({
            address: '50070460',
        })
        .asPromise();
    const {
        lat,
        lng
    } = response.json.results[0].geometry.location;
    return {
        type: 'POINT',
        coordinates: [lat, lng]
    }

}

async function singUp(ctx) {
    try {
        await singUpschema.validateAsync(ctx.request.body);
        const user = await User.create(ctx.request.body);

        user.geolocation = await user.generationLocation();


        ctx.body = user;
    } catch (err) {
        console.log(err);
    }
}


module.exports = singUp;