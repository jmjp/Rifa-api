# Rifa-api
Uma api de rifa com nodejs, express, mongoose, bcrypt e jwt(Jason Web Token) em mvc,

# Funcionamento
Cada usuario consegue ver o "sorteio" e pode comprar quantos numeros quiser, o sorteio tem no maximo 20 numeros e cada um deles custa
Um valor fixo.

# JWT
Utilizei o jwt para evitar enviar login/senha a cada requisição http, o token se renova cada vez que o cliente se conecta com o server,
caso o periodo seja de 30 dias. se for contrario o cliente precisa logar novamente. Em cada solicitação passa-se como promise o id do user.

# Bcrypt
As senhas foram encryptadas com bcrypt para garantir maior segurança.

# Mongoose
Mongose para utilizar o MongoDB como ORM.
