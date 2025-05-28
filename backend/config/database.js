const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('depannage', 'postgres', 'votre_mot_de_passe', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Désactive les logs SQL
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
