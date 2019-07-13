const moongose = require('mongoose');
const User = moongose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async index(req,res){
        const users = await User.findById(req.userId);
        return res.json(users);
    },
    //criar usuario.
    async create(req,res){
        let usercheck = await User.findOne().where('email').equals(req.body.email)
        if(usercheck){
            return res.status(400).json({error: "usuario ou senha invalido"})
        }else{
            userNew = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                balanced: 0,
                email: req.body.email,
            });
            User.create(userNew);
            return res.json("Registred");
        }
    },
    //logar usuario.
    async login(req,res){
        let usercheck = await User.findOne().where('username').equals(req.body.username);
        const match = await bcrypt.compareSync(req.body.password,usercheck.password);
        if(match == true){
            const token = jwt.sign({ id: usercheck._id }, process.env.JWTSECRET, {
                expiresIn: "30 days"
            }, { algorithm: 'RS256'});
            return res.json({token: token});
        }else{
            return res.status(400).json({error: "usuario ou senha invalido"})
        }
    },
    async renewtoken(req,res){
        const token = jwt.sign({ id: req.userId }, process.env.JWTSECRET, {
            expiresIn: 86400
        }, { algorithm: 'RS256'});
        return res.json({token: token});
    }
};