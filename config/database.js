//MYSQL
const Sequelize = require('sequelize')
const sequelize = new Sequelize('teste', 'root', 'melhorenvio',{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function () {
    console.log('conectado com sucesso!');
}).catch(function (err) {
    console.log(("falha ao conectar" + err));
});