"use client";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MailIcon, LockIcon, WrenchIcon, UserIcon } from "lucide-react";



export default function Connexion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    userType: "client" // Valeur par défaut
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3000';

  const login = async (email, password, userType) => {
    try {
      let endpoint = '';
      
      switch(userType) {
        case 'client':
          endpoint = '/api/client/login';
          break;
        case 'technicien':
          endpoint = '/api/technicien/login';
          break;
        case 'admin':
          endpoint = '/api';
          break;
        default:
          throw new Error('Type d\'utilisateur invalide');
      }

      const bodyData = userType === 'client'
        ? { email, mot_de_passe: password } // backend client attend "mot_de_passe"
        : { email, password };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          throw new Error('Email ou mot de passe incorrect');
        } else if (response.status === 403) {
          throw new Error('Veuillez vérifier votre email avant de vous connecter');
        } else if (errorData.error) {
          throw new Error(errorData.error);
        }
        throw new Error('Erreur de connexion au serveur');
      }

      const data = await response.json();
      if (!data) {
        throw new Error('Réponse invalide du serveur');
      }

      return {
        ...data,
        [userType]: data.data
      };

    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    const checkAuth = () => {
      const client = JSON.parse(localStorage.getItem("client") || sessionStorage.getItem("client") || "null");
      const technicien = JSON.parse(localStorage.getItem("technicien") || sessionStorage.getItem("technicien") || "null");
      const admin = JSON.parse(localStorage.getItem("admin") || sessionStorage.getItem("admin") || "null");

      if (client?.email) navigate("/HomeClient");
      if (technicien?.email) navigate("/TechnicienHome");
      if (admin?.email) navigate("/AdminPage");
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await login(
        formData.email, 
        formData.password, 
        formData.userType
      );

      let userData, storageKey, redirectPath;

      switch(formData.userType) {
        case 'client':
          if (!response.client) throw new Error('Réponse serveur invalide pour le client');
          userData = {
            id: response.client.id,
            email: response.client.email,
            nom: response.client.nom,
            prenom: response.client.prenom,
            name: `${response.client.prenom} ${response.client.nom}`,
            role: 'client',
            token: response.token
          };
          storageKey = 'client';
          redirectPath = '/HomeClient';
          break;
        
        case 'technicien':
          if (!response.technicien) throw new Error('Réponse serveur invalide pour le technicien');
          userData = {
            id: response.technicien.id,
            email: response.technicien.email,
            nom: response.technicien.nom,
            prenom: response.technicien.prenom,
            specialite: response.technicien.specialite,
            role: 'technicien',
            token: response.token
          };
          storageKey = 'technicien';
          redirectPath = '/TechnicienHome';
          break;
        
        case 'admin':
          if (!response.admin) throw new Error('Réponse serveur invalide pour l\'admin');
          userData = {
            id: response.admin.id,
            email: response.admin.email,
            nom: response.admin.nom,
            prenom: response.admin.prenom,
            role: 'admin',
            token: response.token
          };
          storageKey = 'admin';
          redirectPath = '/AdminPage';
          break;
      }

      if (formData.rememberMe) {
        localStorage.setItem(storageKey, JSON.stringify(userData));
      } else {
        sessionStorage.setItem(storageKey, JSON.stringify(userData));
      }

      setTimeout(() => {
        navigate(redirectPath);
      }, 500);

    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la connexion");
      console.error('Erreur de connexion:', err);
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
            Connectez-vous à votre compte
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                  Je suis un
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="client">Client</option>
                    <option value="technicien">Technicien</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
              </div>

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
                  isSubmitting ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
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
};