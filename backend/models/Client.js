const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const Client = sequelize.define('Client', {
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le prénom est requis' }
    }
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le nom est requis' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Veuillez fournir un email valide' },
      notEmpty: { msg: 'L\'email est requis' }
    }
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le numéro de téléphone est requis' }
    }
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'L\'adresse est requise' }
    }
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 100],
        msg: 'Le mot de passe doit contenir au moins 8 caractères'
      }
    }
  }
}, {
  timestamps: true,
  hooks: {
    beforeSave: async (client) => {
      if (client.changed('mot_de_passe')) {
        const salt = await bcrypt.genSalt(10);
        client.mot_de_passe = await bcrypt.hash(client.mot_de_passe, salt);
      }
    }
  }
});

// Méthode pour comparer les mots de passe
Client.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.mot_de_passe);
};

module.exports = Client; 