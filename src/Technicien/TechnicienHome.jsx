"use client";
import React, { useState } from 'react';
import { User, Bell, MessageCircle, CalendarDays, WrenchIcon, MapPin, Search, Star, Send, Heart, MoreHorizontal } from 'lucide-react';
import ProfileButton from './ProfileButton';
import { Link } from 'react-router-dom';
import ChatInterfacee from '../Technicien/ChatInterfacee';
export default function TechnicienHome() {
  // État du technicien
  const [technicien] = useState({
    nom: "Mohamed Amine",
    specialite: "Plomberie",
    ville: "Alger",
    note: 4.7,
    disponible: true
  });

  // États de l'interface
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [commentaires, setCommentaires] = useState({});
  const [nouveauCommentaire, setNouveauCommentaire] = useState('');
  const [showPrivateRequestModal, setShowPrivateRequestModal] = useState(false);
  const [privateRequest, setPrivateRequest] = useState({
    client: "",
    probleme: "",
    description: "",
    adresse: "",
    urgence: "normal"
  });

  // Données des publications clients (style réseau social)
  const [publications, setPublications] = useState([
    {
      id: 1,
      client: "Karim Bensaid",
      avatar: "/4e38e73208c8a9c2410e4f1d9cb90ee5.jpg",
      probleme: "Fuite d'eau dans la salle de bain",
      description: "J'ai une fuite importante sous le lavabo depuis hier soir. L'eau coule même quand le robinet est fermé. Besoin d'aide urgent!",
      photos: ["/WC_BOUCHE_EVIER_OBSTRUE_FUITE_DEAU_OU_CHASSE.jpg", "/Tout_au_long_des_850_000_km_de_canalisations_du.jpg"],
      ville: "Alger",
      date: "2025-4-15",
      likes: 8,
      liked: false,
      noteClient: 4.5
    },
    {
      id: 2,
      client: "Leila Mansouri",
      avatar: "/avatars/leila.jpg",
      probleme: "Chauffe-eau en panne",
      description: "Mon chauffe-eau Ariston ne chauffe plus depuis 3 jours. J'ai vérifié le disjoncteur mais tout semble normal. Un spécialiste peut m'aider?",
      photos: ["/Closeup_of_heating_radiator_valve_for_co.jpg"],
      ville: "Oran",
      date: "2025-1-14",
      likes: 12,
      liked: false,
      noteClient: 4.8
    },
    {
      id: 3,
      client: "Yacine Zidane",
      avatar: "/avatars/yacine.jpg",
      probleme: "Climatiseur qui fuit",
      description: "Mon climatiseur fait des flaques d'eau à l'intérieur. C'est un modèle split LG. Quelqu'un connaît ce problème?",
      photos: ["/986a4d67-3c28-4bc4-8e58-e9649bb6c4d2.jpg", "/8594e44bd0603081cae8329f82960d76.jpg"],
      ville: "Constantine",
      date: "2023-11-13",
      likes: 5,
      liked: false,
      noteClient: 4.2
    }
  ]);

  // Données des demandes clients pour le technicien
  const [demandesTechnicien, setDemandesTechnicien] = useState([
    {
      id: 1,
      client: "Ahmed Khelifi",
      titre: "Fuite d'eau sous l'évier",
      description: "Fuite persistante depuis plusieurs jours malgré mes tentatives de réparation. Besoin d'un professionnel.",
      adresse: "12 Rue Didouche Mourad, Alger",
      photos: ["/⚠️ ÉVIER, BAIGNOIRE BOUCHÉE _ FUITE D’EAU _….jpg"],
      date: "2025-05-24 10:30",
      urgence: "urgent",
      statut: "en attente"
    },
    {
      id: 2,
      client: "Samira Belkacem",
      titre: "Chauffe-eau qui fuit",
      description: "Mon chauffe-eau fuit par le bas et ne chauffe plus correctement l'eau.",
      adresse: "45 Rue Hassiba Ben Bouali, Alger",
      photos: ["/chauffe-eau1.jpg"],
      date: "2025-05-23 14:15",
      urgence: "moyen",
      statut: "en attente"
    }
  ]);

  // États supplémentaires
  const [filter, setFilter] = useState('all');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [rendezVous, setRendezVous] = useState([
    {
      id: 1,
      client: "Karim Bensaid",
      probleme: "Fuite d'eau dans la salle de bain",
      description: "Réparation du joint sous l'évier",
      adresse: "12 Rue Didouche Mourad, Alger",
      photos: ["/05e99b51ea7f7457734be54de41567db (1).jpg"],
      date: "2025-05-25T10:00:00",
      confirmed: true,
      createdAt: "2025-05-20T14:30:00"
    },
    {
      id: 2,
      client: "Leila Mansouri",
      probleme: "Chauffe-eau en panne",
      description: "Remplacement de la résistance",
      adresse: "45 Rue Hassiba Ben Bouali, Alger",
      photos: ["/chauffe-eau1.jpg"],
      date: "2025-05-26T14:30:00",
      confirmed: false,
      createdAt: "2025-05-22T09:15:00"
    }
  ]);

  // Gestion des commentaires
  const ajouterCommentaire = (publicationId) => {
    if (!nouveauCommentaire.trim()) return;
    
    setCommentaires({
      ...commentaires,
      [publicationId]: [...(commentaires[publicationId] || []), {
        auteur: technicien.nom,
        avatar: "",
        texte: nouveauCommentaire,
        date: new Date().toLocaleString()
      }]
    });
    
    setNouveauCommentaire('');
  };

  // Gestion des likes
  const toggleLike = (publicationId) => {
    setPublications(publications.map(pub => {
      if (pub.id === publicationId) {
        return {
          ...pub,
          likes: pub.liked ? pub.likes - 1 : pub.likes + 1,
          liked: !pub.liked
        };
      }
      return pub;
    }));
  };

  // Gestion des demandes privées
  const handlePrivateRequestSubmit = (e) => {
    e.preventDefault();
    console.log("Demande privée envoyée:", privateRequest);
    setShowPrivateRequestModal(false);
    setPrivateRequest({
      client: "",
      probleme: "",
      description: "",
      adresse: "",
      urgence: "normal"
    });
  };

  // Gestion des demandes technicien
  const accepterDemande = (demandeId) => {
    setDemandesTechnicien(demandesTechnicien.map(demande => 
      demande.id === demandeId ? { ...demande, statut: "accepté" } : demande
    ));
  };

  const refuserDemande = (demandeId) => {
    setDemandesTechnicien(demandesTechnicien.filter(demande => demande.id !== demandeId));
  };

  // Fonctions pour les rendez-vous
  const confirmRendezVous = (id) => {
    setRendezVous(rendezVous.map(rdv => 
      rdv.id === id ? { ...rdv, confirmed: true } : rdv
    ));
  };

  const cancelRendezVous = (id) => {
    setRendezVous(rendezVous.filter(rdv => rdv.id !== id));
  };

  const viewDetails = (id) => {
    const rdv = rendezVous.find(r => r.id === id);
    console.log("Détails du rendez-vous:", rdv);
  };

  return (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-green-600">
                <WrenchIcon />
              </span>
              <span className="text-green-500 font-bold text-2xl">san</span>
              <span className="text-black font-bold text-2xl">eati</span>
            </div>
            
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            <Link to="/ChatInterfacee" className="p-2 rounded-full hover:bg-gray-100 relative">
              <MessageCircle size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Link>

            <div className="flex items-center space-x-2">
              <div className="bg-emerald-100 rounded-full w-8 h-8 flex items-center justify-center">
                <User size={16} className="text-emerald-700" />
              </div>
              <span className="hidden md:inline font-medium text-gray-700">{technicien.nom}</span>
            </div>
            <Link to="/ProfileButton" className="ml-2 px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              Mon Profil
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex border-t">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex-1 py-3 font-medium text-center transition-colors ${
              activeTab === 'feed' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Fil d'actualité
          </button>
          <button
            onClick={() => setActiveTab('demandes')}
            className={`flex-1 py-3 font-medium text-center transition-colors ${
              activeTab === 'demandes' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Mes Demandes
          </button>
          <button
            onClick={() => setActiveTab('rendezvous')}
            className={`flex-1 py-3 font-medium text-center transition-colors ${
              activeTab === 'rendezvous' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Mes Rendez-vous
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 font-medium text-center transition-colors ${
              activeTab === 'stats' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Statistiques
          </button>
        </div>
      </div>
    </header>






      {/* Main Content */}
     <main className="container mx-auto px-4 py-6">
      
      
      {activeTab === 'feed' && (
        <div className="space-y-6 max-w-2xl mx-auto">
          
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Problèmes récents dans votre région</h2>
              <p className="text-sm text-gray-600">
                Voici les publications des clients dans votre spécialité ({technicien.specialite}) et votre ville ({technicien.ville})
              </p>
            </div>

            {publications.map(publication => (
              <div key={publication.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* En-tête de publication */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
                        {publication.avatar ? (
                          <img src={publication.avatar} alt={publication.client} className="w-full h-full object-cover" />
                        ) : (
                          <User size={18} className="text-emerald-700" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{publication.client}</h3>
                        <p className="text-xs text-gray-500">{publication.ville} • {publication.date}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>

                {/* Contenu de la publication */}
                <div className="p-4">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{publication.probleme}</h4>
                  <p className="text-gray-700 mb-4">{publication.description}</p>
                  
                  {/* Galerie de photos */}
                  {publication.photos.length > 0 && (
                    <div className="mb-4 grid grid-cols-2 gap-2">
                      {publication.photos.map((photo, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg overflow-hidden h-40">
                          <img src={photo} alt={`Problème ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Métriques */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <MapPin className="mr-1" size={14} />
                        <span>{publication.ville}</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(publication.noteClient) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => toggleLike(publication.id)}
                        className={`flex items-center space-x-1 ${publication.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                      >
                        <Heart size={16} className={publication.liked ? 'fill-current' : ''} />
                        <span>{publication.likes}</span>
                      </button>
                    </div>
                  </div>

                  {/* Commentaires existants */}
                  {commentaires[publication.id]?.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-medium mb-2 text-gray-800">Commentaires des techniciens:</h4>
                      {commentaires[publication.id].map((comment, index) => (
                        <div key={index} className="mb-3 last:mb-0">
                          <div className="flex justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-emerald-700">{comment.auteur}</span>
                              {comment.auteur === technicien.nom && (
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Vous</span>
                              )}
                            </div>
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
                      placeholder="Ajouter un commentaire ou un conseil..."
                      className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      rows="2"
                      value={nouveauCommentaire}
                      onChange={(e) => setNouveauCommentaire(e.target.value)}
                    />
                    <div className="flex justify-end mt-2 space-x-3">
                      <button 
                        onClick={() => ajouterCommentaire(publication.id)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Publier
                      </button>
                      <button className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
                        Contacter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'demandes' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Demandes Clients</h2>
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    {technicien.specialite}
                  </span>
                  <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filtrer
                  </button>
                </div>
              </div>

              {/* Liste des demandes */}
              {demandesTechnicien.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>Aucune demande disponible</p>
                  <p className="text-sm mt-1">Les nouvelles demandes apparaîtront ici</p>
                </div>
              ) : (
                demandesTechnicien.map((demande) => (
                  <div key={demande.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{demande.titre}</h3>
                          <p className="text-sm text-gray-600 mt-1">{demande.adresse}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          demande.urgence === 'urgent' ? 'bg-red-100 text-red-800' : 
                          demande.urgence === 'moyen' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {demande.urgence}
                        </span>
                      </div>

                      <p className="mt-3 text-gray-700 text-sm">{demande.description}</p>

                      {demande.photos.length > 0 && (
                        <div className="mt-4">
                          <div className="flex space-x-2 overflow-x-auto pb-2">
                            {demande.photos.map((photo, index) => (
                              <div key={index} className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                                <img src={photo} alt={`Photo ${index}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-t border-gray-200">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs text-gray-500">{demande.date}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => accepterDemande(demande.id)}
                          className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors"
                        >
                          Accepter
                        </button>
                        <button 
                          onClick={() => refuserDemande(demande.id)}
                          className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300 transition-colors"
                        >
                          Refuser
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
          
        {activeTab === 'rendezvous' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Mes Rendez-vous</h2>
                  <button 
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    onClick={() => setShowCalendarModal(true)}
                  >
                    <CalendarDays size={18} />
                    <span>Voir calendrier</span>
                  </button>
                </div>
                
                {/* Filtres */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <button 
                    className={`px-3 py-1 text-sm rounded-full ${filter === 'all' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => setFilter('all')}
                  >
                    Tous
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-full ${filter === 'today' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => setFilter('today')}
                  >
                    Aujourd'hui
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-full ${filter === 'upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => setFilter('upcoming')}
                  >
                    À venir
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-full ${filter === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => setFilter('completed')}
                  >
                    Terminés
                  </button>
                </div>

                {/* Liste des rendez-vous */}
                {rendezVous.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    <p>Aucun rendez-vous prévu</p>
                    <button 
                      className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      onClick={() => setActiveTab('demandes')}
                    >
                      Voir les demandes disponibles
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rendezVous
                      .filter(rdv => {
                        const now = new Date();
                        const rdvDate = new Date(rdv.date);
                        
                        if (filter === 'today') {
                          return rdvDate.toDateString() === now.toDateString();
                        }
                        if (filter === 'upcoming') {
                          return rdvDate > now;
                        }
                        if (filter === 'completed') {
                          return rdvDate < now;
                        }
                        return true;
                      })
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map(rdv => (
                        <div key={rdv.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="p-5">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900">{rdv.client}</h3>
                                <p className="text-sm text-gray-600 mt-1">{rdv.probleme}</p>
                                
                                <div className="flex items-center mt-3">
                                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                  <span className="text-sm text-gray-700">{rdv.adresse}</span>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className={`px-2 py-1 text-xs rounded-full ${
                                  new Date(rdv.date) < new Date() ? 'bg-green-100 text-green-800' : 
                                  rdv.confirmed ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {new Date(rdv.date) < new Date() ? 'Terminé' : rdv.confirmed ? 'Confirmé' : 'En attente'}
                                </div>
                                <div className="mt-2 text-sm font-medium text-gray-900">
                                  {new Date(rdv.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {new Date(rdv.date).toLocaleDateString('fr-FR', {weekday: 'short', day: 'numeric', month: 'short'})}
                                </div>
                              </div>
                            </div>

                            {rdv.photos && rdv.photos.length > 0 && (
                              <div className="mt-4">
                                <div className="flex space-x-2 overflow-x-auto py-2">
                                  {rdv.photos.map((photo, index) => (
                                    <div key={index} className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                                      <img src={photo} alt={`Photo ${index}`} className="w-full h-full object-cover" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-t border-gray-200">
                            <div className="flex items-center">
                              <CalendarDays className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-xs text-gray-500">
                                Créé le {new Date(rdv.createdAt).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                            
                            <div className="flex space-x-2">
                              {new Date(rdv.date) > new Date() && (
                                <>
                                  {!rdv.confirmed && (
                                    <button 
                                      onClick={() => confirmRendezVous(rdv.id)}
                                      className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors"
                                    >
                                      Confirmer
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => cancelRendezVous(rdv.id)}
                                    className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300 transition-colors"
                                  >
                                    Annuler
                                  </button>
                                </>
                              )}
                              <button 
                                onClick={() => viewDetails(rdv.id)}
                                className="px-3 py-1 border border-gray-300 text-gray-800 text-sm rounded hover:bg-gray-100 transition-colors"
                              >
                                Détails
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

        )}
  {showCalendarModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Calendrier des Rendez-vous</h3>
            <button 
              onClick={() => setShowCalendarModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Calendar component */}
          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Mai 2025</h3>
              <div className="flex space-x-2">
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 p-4">
              {/* Day headers */}
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                <div key={day} className="text-center font-medium text-gray-500 text-sm py-2">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {Array.from({length: 31}).map((_, i) => {
                const day = i + 1;
                const hasRdv = rendezVous?.some(rdv => {  // Added optional chaining
                  const rdvDate = new Date(rdv.date);
                  return rdvDate.getDate() === day && rdvDate.getMonth() === 4; // May = month 4 (0-indexed)
                });
                
                return (
                  <div 
                    key={`day-${day}`}  // More unique key
                    className={`text-center p-2 rounded-full ${hasRdv ? 'bg-emerald-100 text-emerald-800 font-medium' : ''}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Appointments list */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-4">Rendez-vous programmés</h4>
            {rendezVous
              ?.filter(rdv => {  // Added optional chaining
                const rdvDate = new Date(rdv.date);
                return rdvDate.getMonth() === 4; // Filter for May
              })
              .map(rdv => (
                <div key={rdv.id} className="border-b py-3 last:border-b-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{rdv.client}</p>
                      <p className="text-sm text-gray-600">{rdv.probleme}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(rdv.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(rdv.date).toLocaleDateString('fr-FR', {day: 'numeric', month: 'short'})}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={() => setShowCalendarModal(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )}

  {activeTab === 'stats' && (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Mes Statistiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Interventions ce mois</h3>
                <p className="text-2xl font-bold text-emerald-700">12</p>
              </div>
              <div className="bg-emerald-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-600">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-emerald-600 mt-2">+2 vs mois dernier</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Note moyenne</h3>
                <p className="text-2xl font-bold text-green-700">4.8/5</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+0.2 vs mois dernier</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-teal-700">168,000 DA</p>
                <h3 className="font-medium text-gray-700">Revenus ce mois</h3>
              </div>
              <div className="bg-teal-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-teal-600">
                  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 1 .9-1.2l.879.66a.75.75 0 0 0 .9 0l.879-.66a.75.75 0 1 1 .9 1.2l-.88.66a2.536 2.536 0 0 1-.92.42V18a.75.75 0 0 0 1.5 0v-.81a3.836 3.836 0 0 0 1.72-.756c.712-.566 1.112-1.35 1.112-2.178 0-.829-.4-1.612-1.113-2.178a3.836 3.836 0 0 0-1.719-.756V6Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-teal-600 mt-2">+15% vs mois dernier</p>
          </div>
        </div>
      </div>
    </div>
  )}
  </main>
   {showPrivateRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Envoyer une demande privée</h3>
            </div>
            <form onSubmit={handlePrivateRequestSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du client</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={privateRequest.client}
                    onChange={(e) => setPrivateRequest({...privateRequest, client: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Problème</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={privateRequest.probleme}
                    onChange={(e) => setPrivateRequest({...privateRequest, probleme: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows="3"
                    value={privateRequest.description}
                    onChange={(e) => setPrivateRequest({...privateRequest, description: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={privateRequest.adresse}
                    onChange={(e) => setPrivateRequest({...privateRequest, adresse: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau d'urgence</label>
                  <select
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={privateRequest.urgence}
                    onChange={(e) => setPrivateRequest({...privateRequest, urgence: e.target.value})}
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="tres-urgent">Très urgent</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPrivateRequestModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Envoyer la demande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}