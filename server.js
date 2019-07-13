const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const app = express();
app.use(express.json());

var mongodb = '';

mongoose.connect(mongodb,{ useNewUrlParser: true});
requireDir('./src/models');

app.use('/api',require('./src/routers'));

app.listen(process.env.PORT ,function(){
    console.log('Running on '+process.env.PORT);
})