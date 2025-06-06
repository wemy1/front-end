"use client";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MailIcon, LockIcon, WrenchIcon } from "lucide-react";
import { loginUser } from './Api';
// Données statiques des utilisateurs (à remplacer par votre propre liste)


export default function Connexion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      redirectBasedOnRole(user.role);
    }
  }, [navigate]);

  const redirectBasedOnRole = (role) => {
    role === 'technician' 
      ? navigate("/TechnicienHome") 
      : navigate("/HomeClient");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    const response = await loginUser(formData.email, formData.password);
    
    // Stockage des données utilisateur
    localStorage.setItem('user', JSON.stringify({
      id: response.user.id,
      email: response.user.email,
      name: `${response.user.prenom} ${response.user.nom}`,
      role: response.user.role // 'client' ou 'technician'
    }));

    // Redirection basée sur le rôle
    redirectBasedOnRole(response.user.role);
  } catch (err) {
    setError(err.message || "Email ou mot de passe incorrect");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex">
          <div className="h-48 w-full bg-green-600 flex items-center justify-center">
            <WrenchIcon className="h-24 w-24 text-white" />
          </div>
        </div>

        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">
            Dépannage à domicile
          </div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Connexion</h1>
          <p className="mt-2 text-gray-600">
            Connectez-vous à votre compte pour accéder à nos services
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Se souvenir de moi
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/MotDePasseOublié"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting
                    ? "bg-green-400"
                    : "bg-green-600 hover:bg-green-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {isSubmitting ? "Connexion en cours..." : "Se connecter"}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Vous n'avez pas de compte ?{" "}
              <Link
                to="/RegistrationPage"
                className="font-medium text-green-600 hover:text-green-500"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}