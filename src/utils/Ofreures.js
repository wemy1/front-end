// Messages d'erreur pour la validation des champs
const VALIDATION_ERRORS = {
    REQUIRED: {
        nom: "Le nom est obligatoire",
        prenom: "Le prénom est obligatoire",
        email: "L'email est obligatoire",
        telephone: "Le numéro de téléphone est obligatoire",
        adresse: "L'adresse est obligatoire",
        mot_de_passe: "Le mot de passe est obligatoire"
    },
    FORMAT: {
        email: "Format d'email invalide",
        telephone: "Format de numéro de téléphone invalide (exemple: 06 12 34 56 78)",
        mot_de_passe: "Le mot de passe doit contenir au moins 8 caractères"
    },
    LENGTH: {
        nom: "Le nom doit contenir au moins 2 caractères",
        prenom: "Le prénom doit contenir au moins 2 caractères",
        adresse: "L'adresse doit contenir au moins 5 caractères"
    }
};

// Messages d'erreur pour l'authentification
const AUTH_ERRORS = {
    EMAIL_EXISTS: "Cette adresse email est déjà utilisée",
    PHONE_EXISTS: "Ce numéro de téléphone est déjà utilisé",
    INVALID_CREDENTIALS: "Email ou mot de passe incorrect",
    ACCOUNT_NOT_VERIFIED: "Votre compte n'est pas encore vérifié",
    VERIFICATION_EXPIRED: "Le code de vérification a expiré",
    INVALID_CODE: "Code de vérification invalide"
};

// Messages d'erreur pour les requêtes API
const API_ERRORS = {
    NETWORK_ERROR: "Erreur de connexion. Veuillez vérifier votre connexion internet",
    SERVER_ERROR: "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard",
    TIMEOUT: "La requête a pris trop de temps. Veuillez réessayer",
    UNAUTHORIZED: "Vous n'êtes pas autorisé à effectuer cette action",
    SESSION_EXPIRED: "Votre session a expiré. Veuillez vous reconnecter"
};

// Messages de succès
const SUCCESS_MESSAGES = {
    REGISTRATION: "Inscription réussie !",
    VERIFICATION: "Votre compte a été vérifié avec succès",
    PASSWORD_RESET: "Votre mot de passe a été réinitialisé avec succès",
    PROFILE_UPDATE: "Votre profil a été mis à jour avec succès"
};

// Fonction pour formater les messages d'erreur
const formatError = (error) => {
    if (typeof error === 'string') {
        return error;
    }
    if (Array.isArray(error)) {
        return error.join('\n');
    }
    if (error.message) {
        return error.message;
    }
    return "Une erreur inattendue s'est produite";
};

// Fonction pour valider un email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Fonction pour valider un numéro de téléphone français
const validatePhone = (phone) => {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone);
};

// Fonction pour valider un mot de passe
const validatePassword = (password) => {
    return password && password.length >= 8;
};

// Exporter toutes les constantes et fonctions
module.exports = {
    VALIDATION_ERRORS,
    AUTH_ERRORS,
    API_ERRORS,
    SUCCESS_MESSAGES,
    formatError,
    validateEmail,
    validatePhone,
    validatePassword
}; 