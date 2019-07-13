const moongose = require('mongoose');
const Raffle = moongose.model('Raffle');
const User = moongose.model('User');


module.exports = {
    async index(req,res){
        const rifas = await Raffle.find();
        
        return res.json(rifas);
    },
    //criar rifa apenas para admin.
    async create(req,res){
        let usercheck = await User.findOne().where('username').equals('sleepy22');
        if(usercheck._id == req.userId){ //meu id de adm
            rifa = new Raffle({
                itemName: req.body.itemName,
                numbers: req.body.numbers,
                imageUrl: req.body.imageUrl,
                priceNumber: req.body.valor,
            });
            Raffle.create(rifa);
            return res.json({reason: "created"});
        }else{
            return res.json({error: "sem permissão"});
        }
    },
    //lista x rifa e numeros
    async view(req,res){
        var idraffle = req.params.id;
        try{
            let raffle = await Raffle.findById(idraffle);
            return res.json(raffle);
        }catch(err){
            return res.json({error: err})
        }
        
        
    },
    //deletar x riffa
    async destroy(req,res){
        let usercheck = await User.findOne().where('username').equals('sleepy22');
        if(usercheck._id == req.userId){ //meu id de adm
            await Raffle.findByIdAndRemove(req.params.id);
            return res.json({reason: "removed"});
        }else{
            return res.json({error: "sem permissão"});
        }
    }

};