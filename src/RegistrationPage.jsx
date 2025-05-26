import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, Home, Wrench, Lock } from "lucide-react";

// Fonction API pour l'inscription
const registerUser = async (userData) => {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erreur lors de l\'inscription');
  }

  return response.json();
};

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prenom: '', // Changé de firstName à prenom pour correspondre au backend
    nom: '',    // Changé de lastName à nom pour correspondre au backend
    email: '',
    telephone: '', // Changé de phone à telephone pour correspondre au backend
    adresse: '',   // Changé de address à adresse pour correspondre au backend
    mot_de_passe: '', // Changé de password à mot_de_passe pour correspondre au backend
    urgent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // Validation côté client
    if (formData.mot_de_passe.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError("Veuillez entrer une adresse email valide");
      setIsSubmitting(false);
      return;
    }

    try {
      // Préparation des données pour l'API (enlever le champ urgent qui n'est pas utilisé côté backend)
      const { urgent, ...apiData } = formData;
      
      await registerUser(apiData);
      setSuccess(true);
      
      // Redirection après un court délai pour permettre à l'utilisateur de voir le message de succès
      setTimeout(() => {
        navigate("/Connexion");
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      
      if (error.message.includes('Email already in use')) {
        setError("Cette adresse email est déjà utilisée");
      } else if (error.message.includes('Network')) {
        setError("Erreur réseau : vérifiez votre connexion internet");
      } else if (error.message.includes('Failed to fetch')) {
        setError("Impossible de contacter le serveur. Vérifiez que l'API est démarrée.");
      } else {
        setError(error.message || "Erreur lors de l'inscription");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <div className="h-48 w-full object-cover md:h-full md:w-48 bg-gray-800 flex items-center justify-center">
              <Wrench className="h-24 w-24 text-green-500" />
            </div>
          </div>
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">Dépannage à domicile</div>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">Inscription au service</h1>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-300">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md border border-green-300">
                <p className="text-sm">Inscription réussie ! Un code de vérification a été envoyé à votre email. Redirection en cours...</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-500 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-500 bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-500 bg-gray-50"
                      placeholder="exemple@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-500 bg-gray-50"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                    Adresse <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="adresse"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-500 bg-gray-50"
                      placeholder="123 rue de la Paix, 75001 Paris"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mot_de_passe" className="block text-sm font-medium text-gray-700">
                    Mot de passe <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 ml-2">(minimum 8 caractères)</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="password"
                      id="mot_de_passe"
                      name="mot_de_passe"
                      value={formData.mot_de_passe}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-500 bg-gray-50"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="urgent"
                    name="urgent"
                    type="checkbox"
                    checked={formData.urgent}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="urgent" className="ml-2 block text-sm text-gray-700">
                    Intervention urgente (supplément tarifaire)
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gray-900 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-600'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Inscription en cours...
                    </>
                  ) : (
                    'Créer mon compte'
                  )}
                </button>

                <div className="text-center mt-5">
                  <p className="text-sm text-gray-600">
                    Vous avez déjà un compte ?{" "}
                    <span
                      onClick={() => navigate("/Connexion")}
                      className="text-green-600 hover:text-green-800 hover:underline cursor-pointer transition-colors font-medium"
                    >
                      Se connecter
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}