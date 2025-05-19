import { User, Lock, Bell,  CreditCard, Globe, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function PageParametres() {
  const [activeSection, setActiveSection] = useState('compte');
  const [formData, setFormData] = useState({
    nom: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    telephone: '+212 6 12 34 56 78',
    notifications: true,
    newsletter: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Paramètres sauvegardés avec succès!');
    // Ici vous ajouteriez normalement l'appel à votre API
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Paramètres</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Menu latéral */}
          <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveSection('compte')}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${activeSection === 'compte' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <User className="mr-3" size={18} />
                Compte
              </button>
              <button
                onClick={() => setActiveSection('securite')}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${activeSection === 'securite' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Lock className="mr-3" size={18} />
                Sécurité
              </button>
              <button
                onClick={() => setActiveSection('notifications')}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${activeSection === 'notifications' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Bell className="mr-3" size={18} />
                Notifications
              </button>
              <button
                onClick={() => setActiveSection('facturation')}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${activeSection === 'facturation' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <CreditCard className="mr-3" size={18} />
                Facturation
              </button>
              <button
                onClick={() => setActiveSection('langue')}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${activeSection === 'langue' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Globe className="mr-3" size={18} />
                Langue
              </button>
            </nav>

            <button className="w-full mt-6 flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
              <LogOut className="mr-3" size={18} />
              Déconnexion
            </button>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            {activeSection === 'compte' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Informations du compte</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Nom complet</label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Enregistrer les modifications
                  </button>
                </form>
              </div>
            )}

            {activeSection === 'securite' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Sécurité du compte</h2>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Mot de passe</h3>
                    <p className="text-gray-600 mb-4">Dernière modification il y a 3 mois</p>
                    <button className="text-green-600 hover:text-green-800 font-medium">
                      Modifier le mot de passe
                    </button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Authentification à deux facteurs</h3>
                    <p className="text-gray-600 mb-4">Actuellement désactivée</p>
                    <button className="text-green-600 hover:text-green-800 font-medium">
                      Activer la 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Préférences de notifications</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notifications par email</h3>
                        <p className="text-gray-600 text-sm">Recevoir les notifications importantes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="notifications"
                          checked={formData.notifications}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Newsletter</h3>
                        <p className="text-gray-600 text-sm">Recevoir nos offres spéciales</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Enregistrer les préférences
                  </button>
                </form>
              </div>
            )}

            {activeSection === 'facturation' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Informations de facturation</h2>
                <div className="p-6 bg-gray-50 rounded-lg text-center">
                  <CreditCard className="mx-auto text-gray-400" size={48} />
                  <p className="mt-4 text-gray-600">Aucune méthode de paiement enregistrée</p>
                  <button className="mt-4 text-green-600 hover:text-green-800 font-medium">
                    Ajouter une carte
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'langue' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Préférences linguistiques</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Français</h3>
                        <p className="text-gray-600 text-sm">Langue actuelle</p>
                      </div>
                      <input type="radio" name="langue" checked className="text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Anglais</h3>
                        <p className="text-gray-600 text-sm">English</p>
                      </div>
                      <input type="radio" name="langue" className="text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Arabe</h3>
                        <p className="text-gray-600 text-sm">العربية</p>
                      </div>
                      <input type="radio" name="langue" className="text-green-600" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Changer de langue
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}