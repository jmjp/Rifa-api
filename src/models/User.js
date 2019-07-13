const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        minlength: 20,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    points:{
        type: Number,
        default: 0,
    },
    steamtrade:{
        type: String,
        required: false,
        default: "http://steamcommunity.com/"
    }

});


mongoose.model('User',UserSchema);