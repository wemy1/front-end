"use client";
import React, { useState } from 'react';
import { User, Bell, MessageCircle, CalendarDays, Clock, MapPin, CheckCircle2, XCircle, Search, Star } from 'lucide-react';

export default function TechnicienHome() {
  // État du technicien
  const [technicien] = useState({
    nom: "Jean Dupont",
    specialite: "Plomberie",
    ville: "Paris",
    note: 4.7,
    disponible: true
  });

  // États de l'interface
  const [activeTab, setActiveTab] = useState('demandes');
  const [searchQuery, setSearchQuery] = useState('');
  const [commentaires, setCommentaires] = useState({});
  const [nouveauCommentaire, setNouveauCommentaire] = useState('');

  // Données des demandes (filtrées par spécialité)
  const [demandes] = useState([
    {
      id: 1,
      client: "Marie Lambert",
      probleme: "Fuite d'eau sous l'évier",
      description: "Fuite importante depuis hier soir, besoin d'intervention urgente",
      specialite: "Plomberie",
      ville: "Paris",
      date: "2023-06-15",
      photos: [],
      noteClient: 4.5
    },
    {
      id: 2,
      client: "Pierre Martin",
      probleme: "Chauffe-eau en panne",
      description: "Le chauffe-eau ne produit plus d'eau chaude depuis 2 jours",
      specialite: "Plomberie",
      ville: "Paris",
      date: "2023-06-16",
      photos: [],
      noteClient: 4.2
    }
  ]);

  // Filtrer les demandes par spécialité du technicien
  const demandesFiltrees = demandes.filter(
    demande => demande.specialite === technicien.specialite && 
    demande.ville === technicien.ville
  );

  // Gestion des commentaires
  const ajouterCommentaire = (demandeId) => {
    if (!nouveauCommentaire.trim()) return;
    
    setCommentaires({
      ...commentaires,
      [demandeId]: [...(commentaires[demandeId] || []), {
        auteur: technicien.nom,
        texte: nouveauCommentaire,
        date: new Date().toLocaleString()
      }]
    });
    
    setNouveauCommentaire('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-blue-600">Saneati Pro</h1>
              
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>

              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <MessageCircle size={20} />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </button>

              <div className="flex items-center space-x-2">
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="hidden md:inline">{technicien.nom}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex border-t">
            <button
              onClick={() => setActiveTab('demandes')}
              className={`flex-1 py-3 font-medium text-center ${
                activeTab === 'demandes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Demandes ({demandesFiltrees.length})
            </button>
            <button
              onClick={() => setActiveTab('rendezvous')}
              className={`flex-1 py-3 font-medium text-center ${
                activeTab === 'rendezvous' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Mes Rendez-vous
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-3 font-medium text-center ${
                activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Statistiques
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'demandes' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Demandes en {technicien.specialite}</h2>
              <p className="text-sm text-gray-600">
                Vous voyez uniquement les demandes correspondant à votre spécialité ({technicien.specialite}) et votre ville ({technicien.ville})
              </p>
            </div>

            {demandesFiltrees
              .filter(demande => 
                demande.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                demande.probleme.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(demande => (
                <div key={demande.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{demande.probleme}</h3>
                        <p className="text-gray-600">{demande.client}</p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(demande.noteClient) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-gray-700 mb-4">{demande.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="mr-1" size={14} />
                        <span>{demande.ville}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarDays className="mr-1" size={14} />
                        <span>{demande.date}</span>
                      </div>
                    </div>

                    {/* Commentaires existants */}
                    {commentaires[demande.id]?.length > 0 && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="font-medium mb-2">Commentaires:</h4>
                        {commentaires[demande.id].map((comment, index) => (
                          <div key={index} className="mb-3 last:mb-0">
                            <div className="flex justify-between">
                              <span className="font-medium">{comment.auteur}</span>
                              <span className="text-xs text-gray-400">{comment.date}</span>
                            </div>
                            <p className="text-gray-600">{comment.texte}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Ajout de commentaire */}
                    <div className="mt-4">
                      <textarea
                        placeholder="Ajouter un commentaire..."
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                        value={nouveauCommentaire}
                        onChange={(e) => setNouveauCommentaire(e.target.value)}
                      />
                      <div className="flex justify-end mt-2 space-x-3">
                        <button 
                          onClick={() => ajouterCommentaire(demande.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Envoyer
                        </button>
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                          Contacter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {activeTab === 'rendezvous' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Mes Rendez-vous</h2>
              <div className="text-center py-8 text-gray-500">
                <p>Aucun rendez-vous prévu</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Mes Statistiques</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium">Interventions ce mois</h3>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium">Note moyenne</h3>
                  <p className="text-2xl font-bold">4.8/5</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium">Revenus</h3>
                  <p className="text-2xl font-bold">1,240€</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
