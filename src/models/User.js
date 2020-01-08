const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const moment = require('moment');
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyB6lHSF83SypD6_LHTWaxOMLbfoe_Xt7D8',
    Promise
});


const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha: {
        type: String
    },
    telefones: [{
        numero: String,
        ddd: String
    }],
    cep: {
        type: String
    },
    geolocation: {
        type: {
            type: String
        },
        coordinates: [Number],
    },
    token: {
        type: String
    },

    data_criacao: {
        type: Date,
        default: moment(new Date()).locale('pt-br').format("DD/MM/YYYY"),
    },
    data_atualizacao: {
        type: Date,
        default: moment(new Date()).locale('pt-br').format("DD/MM/YYYY"),
    },
    ultimo_login: {
        type: Date,
        default: moment(new Date()).locale('pt-br').format("DD/MM/YYYY"),
    }
});



UserSchema.pre("save", async function hashPassword() {

    this.senha = await bcrypt.hash(this.senha, 8);
});

UserSchema.methods = {

    compareHash(hash) {
        return bcrypt.compare(hash, this.senha);
    },

    generateToken() {
        return jwt.sign({
            id: this.id
        }, "secret", {
            expiresIn: 1800
        });
    },


    async generationLocation() {
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

};

module.exports = mongoose.model('User', UserSchema);