import { LifeBuoy, Mail, Phone, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function PageSupport() {
  const [ongletActif, setOngletActif] = useState('contact');
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Demande envoyée:', formData);
    alert('Merci pour votre message! Nous vous répondrons dans les 24 heures.');
    setFormData({ nom: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-green-600 mb-2">Support Technique</h1>
          <p className="text-gray-600">Nous sommes là pour vous aider 24h/24</p>
        </div>

        {/* Contenu principal */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Navigation par onglets */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${ongletActif === 'contact' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
              onClick={() => setOngletActif('contact')}
            >
              <div className="flex items-center justify-center gap-2">
                <Mail size={18} />
                Contactez-nous
              </div>
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${ongletActif === 'faq' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
              onClick={() => setOngletActif('faq')}
            >
              <div className="flex items-center justify-center gap-2">
                <AlertCircle size={18} />
                FAQ
              </div>
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${ongletActif === 'urgence' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
              onClick={() => setOngletActif('urgence')}
            >
              <div className="flex items-center justify-center gap-2">
                <Phone size={18} />
                Urgence
              </div>
            </button>
          </div>

          {/* Contenu des onglets */}
          <div className="p-6">
            {ongletActif === 'contact' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nom complet</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={formData.nom}
                      onChange={(e) => setFormData({...formData, nom: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-lg"
                      rows="5"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            )}

            {ongletActif === 'faq' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Questions fréquentes</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-medium">Comment réinitialiser mon mot de passe ?</h3>
                    <p className="text-gray-600 mt-1">Allez dans Paramètres → Compte → Modifier mot de passe</p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-medium">Comment annuler une intervention ?</h3>
                    <p className="text-gray-600 mt-1">Contactez-nous au moins 24h à l'avance par téléphone</p>
                  </div>
                </div>
              </div>
            )}

            {ongletActif === 'urgence' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Support d'urgence</h2>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-red-700">À utiliser uniquement pour les problèmes urgents</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Phone className="text-green-600" />
                    <div>
                      <h3 className="font-medium">Appel téléphonique</h3>
                      <p className="text-gray-600">+212 6 12 34 56 78</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <MessageSquare className="text-green-600" />
                    <div>
                      <h3 className="font-medium">Chat en direct</h3>
                      <p className="text-gray-600">Disponible 24h/24</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section informations */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Informations supplémentaires</h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <Clock className="text-gray-400" />
              <div>
                <h3 className="font-medium">Heures d'ouverture</h3>
                <p className="text-gray-600">Lun-Ven: 8h-20h</p>
                <p className="text-gray-600">Sam-Dim: 9h-18h</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LifeBuoy className="text-gray-400" />
              <div>
                <h3 className="font-medium">Centre d'aide</h3>
                <p className="text-gray-600">Consultez notre base de connaissances</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}