const Client = require('../models/Client');
const jwt = require('jsonwebtoken');

// Fonction pour générer un token JWT
const generateToken = (clientId) => {
  return jwt.sign({ id: clientId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.signup = async (req, res) => {
  try {
    const { prenom, nom, email, telephone, adresse, mot_de_passe } = req.body;

    // Vérifier si le client existe déjà
    const clientExists = await Client.findOne({ where: { email } });
    if (clientExists) {
      return res.status(400).json({
        error: 'Un client avec cet email existe déjà'
      });
    }

    // Créer un nouveau client
    const client = await Client.create({
      prenom,
      nom,
      email,
      telephone,
      adresse,
      mot_de_passe
    });

    // Générer le token
    const token = generateToken(client.id);

    // Renvoyer la réponse
    res.status(201).json({
      client: {
        id: client.id,
        prenom: client.prenom,
        nom: client.nom,
        email: client.email,
        telephone: client.telephone,
        adresse: client.adresse
      },
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      return res.status(400).json({ errors });
    }
    
    res.status(500).json({
      error: 'Erreur lors de l\'inscription'
    });
  }
}; 