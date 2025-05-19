import { Search, MapPin, CalendarDays, Star, Check, Clock, X } from 'lucide-react';
import { useState } from 'react';

export default function DemandesPrivees() {
  // État pour les filtres
  const [filtre, setFiltre] = useState('toutes');
  const [recherche, setRecherche] = useState('');

  // Données exemple (à remplacer par vos données réelles)
  const demandes = [
    {
      id: 1,
      titre: "Réparation chauffe-eau",
      client: "Marie Martin",
      adresse: "15 Rue de Lyon, Paris",
      date: "2023-06-15T14:00:00",
      statut: "confirmée",
      note: 4.5
    },
    {
      id: 2,
      titre: "Installation climatiseur",
      client: "Pierre Durand",
      adresse: "22 Av. des Champs-Élysées",
      date: "2023-06-10T10:00:00",
      statut: "en_attente",
      note: null
    }
  ];

  // Filtrer les demandes
  const demandesFiltrees = demandes.filter(demande => {
    const matchesFiltre = filtre === 'toutes' || demande.statut === filtre;
    const matchesRecherche = 
      demande.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      demande.client.toLowerCase().includes(recherche.toLowerCase());
    return matchesFiltre && matchesRecherche;
  });

  // Formater la date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes Demandes Privées</h1>
      
      {/* Barre de filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <select 
            className="border rounded-lg px-3 py-2"
            value={filtre}
            onChange={(e) => setFiltre(e.target.value)}
          >
            <option value="toutes">Toutes</option>
            <option value="en_attente">En attente</option>
            <option value="confirmée">Confirmées</option>
            <option value="terminée">Terminées</option>
          </select>
        </div>
        
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par client ou description..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>
      </div>

      {/* Liste des demandes */}
      <div className="space-y-4">
        {demandesFiltrees.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">Aucune demande trouvée</p>
          </div>
        ) : (
          demandesFiltrees.map((demande) => (
            <div 
              key={demande.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                demande.statut === 'confirmée' ? 'border-blue-500' :
                demande.statut === 'en_attente' ? 'border-yellow-500' :
                'border-green-500'
              }`}
            >
              <div className="p-4 border-b flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{demande.titre}</h3>
                  <p className="text-gray-600">Client: {demande.client}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  demande.statut === 'confirmée' ? 'bg-blue-100 text-blue-800' :
                  demande.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {demande.statut.replace('_', ' ')}
                </span>
              </div>
              
              <div className="p-4">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="mr-1" size={16} />
                    <span>{demande.adresse}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="mr-1" size={16} />
                    <span>{formatDate(demande.date)}</span>
                  </div>
                </div>
                
                {/* Actions selon le statut */}
                {demande.statut === 'en_attente' && (
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                      <Check size={16} />
                      Confirmer
                    </button>
                    <button className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2">
                      <Clock size={16} />
                      Reporter
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center justify-center gap-2">
                      <X size={16} />
                      Annuler
                    </button>
                  </div>
                )}

                {demande.statut === 'confirmée' && (
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                      Démarrer l'intervention
                    </button>
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                      Détails
                    </button>
                  </div>
                )}

                {demande.statut === 'terminée' && demande.note && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 mr-1" size={16} />
                      <span className="font-medium">{demande.note}/5</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      Voir l'évaluation
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}