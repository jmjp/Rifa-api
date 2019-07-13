const mongoose = require('mongoose');

const JoinedRaffleSchema = new mongoose.Schema({
    raffle:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Raffle',
    },
    number:{
        type: Number,
        required: true,
    },
    userJoin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});


mongoose.model('JoinedRaffle',JoinedRaffleSchema);