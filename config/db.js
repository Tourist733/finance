const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://finance_user:Lider@73@localhost:5432/finance', {
  dialect: 'postgres',
  logging: false,
});

module.exports = { sequelize };