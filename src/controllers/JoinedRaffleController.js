const moongose = require('mongoose');
const JoinedRaffle = moongose.model('JoinedRaffle');
const Raffle = moongose.model('Raffle');
const User = moongose.model('User');


module.exports = {
    //lista x rifa e numeros
    async joinraffle(req,res){
        let check = await Raffle.findById(req.body.raffleid);
        let user = await User.findById(req.userId);
        var number = parseInt(req.body.number);
        if(check.numbers >= number && user.points >= check.priceNumber && req.body.number > 0){
            let check2 = await JoinedRaffle.findOne({$and:[{raffle:req.body.raffleid},{number: req.body.number}]});
            if(check2){
                return res.json({error:"numero ja selecionado"});
            }else{
                var nraffle = new JoinedRaffle({
                    raffle: req.body.raffleid,
                    userJoin: req.userId,
                    number: req.body.number,
                });
                await JoinedRaffle.create(nraffle);
                await User.findByIdAndUpdate(req.userId,{balanced: user.balanced - check.priceNumber});
                return res.json("cadastrado");
            }
        }else{
            return res.json({error: "numero invalido"});
        }
    },
    //lista as rifas que participei
    async view(req,res){
        let check = await JoinedRaffle.find({userJoin:req.userId});
        return res.json(check);
    },
    async getjoinednumbers(req,res){
        let check = await JoinedRaffle.find({raffle:req.params.id}).select('number')
        return res.json(check);
    }

};