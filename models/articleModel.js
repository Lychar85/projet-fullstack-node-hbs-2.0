const mongoose = require('mongoose');


const articleModel = new mongoose.Schema({

    missionType: {
        type: String,

    },

    description: {
        type: String,

    },

    skills: {
        type: String,

    },

    location:{
        type: String,

    },

    date:{
        type: String,

    },

    dure:{
        type: String,

    },

})

module.exports = mongoose.model('mission', articleModel)