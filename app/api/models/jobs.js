// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('teste', 'root', 'melhorenvio',{
//     host: 'localhost',
//     dialect: 'mysql'
// });
//
// const Job = sequelize.define('job', {
//     jobPosition: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: Sequelize.TEXT,
//         allowNull: false,
//     },
//     employer: {
//         type: Sequelize.STRING,
//         // trim: true,
//         allowNull: false,
//     },
//     salary: {
//         type: Sequelize.FLOAT,
//         allowNull: false,
//     }
// });
//
// Job.sync({force: true});