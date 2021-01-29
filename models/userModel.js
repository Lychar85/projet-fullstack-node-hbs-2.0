const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userModel = new mongoose.Schema({

    prenom: {
        type: String,

    },

    nom: {
        type: String,

    },

    email: {
        type: String,

  
    },

    password:{
        type: String,

    },



})

userModel.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (err, encr) => {

        user.password = encr
        next()
    })
})

module.exports = mongoose.model('user', userModel)