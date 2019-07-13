const mongoose = require('mongoose');

var future = new Date();

const RaffleSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    finishAt:{
        type: Date,
        default: future.setDate(future.getDate() + 7),
    },
    numbers:{
        type: Number,
        required: true,
    },
    winner:{
        type: Number,
        default: null,
    },
    imageUrl:{
        type: String,
        required: true,
        default: 'https://steamcommunity.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWNU6dNoxL3H94qm3Ffm_RE6amn2ctWXdlI2ZwqB-FG_w-7s0ZK-7cjLzyE37HI8pSGKrIDGOAI/'
    },
    priceNumber:{
        type: Number,
        required: true,
    }
});


mongoose.model('Raffle',RaffleSchema);