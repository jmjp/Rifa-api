const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const UserController = require('./controllers/UserController');
const RaffleControler = require('./controllers/RaffleController');
const JoinedRaffle = require('./controllers/JoinedRaffleController');

function verifyJWT(req, res, next){
    var token = req.headers['token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

//userController
routes.post("/users", UserController.create);
routes.post("/users/login", UserController.login);
routes.post("/user/myprofile",verifyJWT,UserController.index);
routes.post("/users/renew",verifyJWT,UserController.renewtoken);

//rotas com autenticação jwt
routes.post("/raffle", verifyJWT,RaffleControler.index);
routes.post("/raffle/create", verifyJWT,RaffleControler.create);
routes.get("/raffle/view/:id", verifyJWT,RaffleControler.view);
routes.delete("/raffle/delete/:id", verifyJWT, RaffleControler.destroy);

//rota para entrar numa riffa
routes.post("/joinraffle",verifyJWT, JoinedRaffle.joinraffle);
routes.post("/myraffles",verifyJWT, JoinedRaffle.view);
routes.get("/joinraffle/:id",verifyJWT, JoinedRaffle.getjoinednumbers);
module.exports = routes;