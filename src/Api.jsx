import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adaptez selon votre port backend

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/RegistrationPage`, {
      nom: userData.lastName,
      prenom: userData.firstName,
      email: userData.email,
      mot_de_passe: userData.password,
      telephone: userData.phone,
      adresse: userData.address,
      urgent: userData.urgent
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur de connexion au serveur" };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/Connexion`, {
      email,
      mot_de_passe: password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur de connexion" };
  }
};
