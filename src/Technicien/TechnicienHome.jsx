"use client";
import React, {  Suspense, useState, useEffect } from 'react';
import {
  CalendarDays, Clock,
  User, Bell, Search,
  Plus, MessageCircle, Star,
  Camera, TrendingUp, Glasses, Euro, MapPin
} from 'lucide-react';

export default function TechnicienHome() {
  const [activeTab, setActiveTab] = useState("public");
  const [searchQuery, setSearchQuery] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showAR, setShowAR] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showTechSheet, setShowTechSheet] = useState(false);

  const [publicPosts, setPublicPosts] = useState([
    {
      id: 1,
      clientName: "Pierre Martin",
      location: "Paris, 75015",
      date: "15 mai 2024",
      problem: "Plomberie - Fuite d'eau",
      description: "Fuite importante sous l'évier de la cuisine nécessitant une réparation urgente",
      status: "Nouveau",
      comments: [
        { id: 1, techName: "Technicien 1", comment: "Je peux intervenir demain", time: "il y a 1h" }
      ],
      photos: [],
      rating: 4.5,
      techSheet: {
        steps: ["Couper l'eau", "Diagnostiquer la fuite", "Remplacer le joint"],
        parts: ["Joint 40mm", "Téflon"],
        duration: "1h30",
        safety: ["Gants", "Lunettes"]
      },
    },
    {
      id: 2,
      clientName: "Sophie Dupont",
      location: "Lyon, 69002",
      date: "16 mai 2024",
      problem: "Problème électrique",
      description: "Plusieurs prises ne fonctionnent pas dans le salon",
      status: "Nouveau",
      comments: [],
      photos: [],
      rating: 4.2,
      techSheet: {
        steps: ["Couper le courant", "Vérifier le tableau électrique", "Tester les prises"],
        parts: ["Fusibles", "Fils électriques"],
        duration: "2h",
        safety: ["Gants isolants", "Testeur de tension"]
      },
    }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nouvelle demande de Jean", read: false, time: "10 min" },
    { id: 2, text: "Rendez-vous confirmé avec Marie", read: false, time: "1h" }
  ]);

  const [stats] = useState({
    interventions: 24,
    avgTime: "2h15",
    satisfaction: 4.8,
    revenue: "€2,450"
  });

  const [stock] = useState([
    { id: 1, name: "Joint 40mm", quantity: 5, unit: "pièces" },
    { id: 2, name: "Ampoules LED", quantity: 12, unit: "pièces" }
  ]);

  useEffect(() => {
    const handleConnectionChange = () => {
      setOfflineMode(!navigator.onLine);
    };
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    setPublicPosts(posts => posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(),
                techName: "Vous",
                comment: newComment,
                time: "maintenant"
              }
            ]
          }
        : post
    ));
    setNewComment("");
  };

  const handlePhotoUpload = (postId, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setPublicPosts(posts => posts.map(post =>
        post.id === postId
          ? {
              ...post,
              photos: [...post.photos, { id: Date.now(), url: event.target.result }]
            }
          : post
      ));
    };
    reader.readAsDataURL(file);
  };

  const handleAcceptRequest = (postId) => {
    setPublicPosts(posts => posts.filter(post => post.id !== postId));
    setNotifications(prev => [
      ...prev,
      { id: Date.now(), text: "Demande acceptée", read: false, time: "maintenant" }
    ]);
  };

  const filteredPosts = publicPosts.filter(post =>
    post.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mode hors-ligne */}
      {offlineMode && (
        <div className="bg-yellow-100 text-yellow-800 p-2 text-center text-sm sticky top-0 z-20">
          ⚠️ Mode hors-ligne - Synchronisation à la reconnexion
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-green-600">FixHome Pro</h1>
              
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <MessageCircle size={20} />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </button>

              <button 
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="hidden md:inline">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-6">
        {/* Barre d'outils */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("public")}
              className={`px-4 py-2 font-medium rounded-lg ${activeTab === "public" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Demandes Publiques
            </button>
            <button
              onClick={() => setActiveTab("private")}
              className={`px-4 py-2 font-medium rounded-lg ${activeTab === "private" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Mes Rendez-vous
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-4 py-2 font-medium rounded-lg ${activeTab === "stats" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Statistiques
            </button>
          </div>

          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
              <CalendarDays className="mr-2" size={18} />
              Calendrier
            </button>
            <button 
              className="flex items-center px-4 py-2 bg-purple-50 text-purple-600 rounded-lg"
              onClick={() => setShowAR(true)}
            >
              <Glasses className="mr-2" size={18} />
              Assistant AR
            </button>
          </div>
        </div>

        {/* Onglet Demandes Publiques */}
        {activeTab === "public" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <img src={post.avatar} alt={post.clientName} className="w-12 h-12 rounded-full" />
                        <div>
                          <h3 className="font-bold">{post.problem}</h3>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                fill={i < Math.floor(post.rating) ? "#FBBF24" : "#E5E7EB"} 
                                className="text-yellow-400 w-4 h-4" 
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({post.rating})</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        post.status === "Nouveau" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-700 mb-4">{post.description}</p>
                    
                    {/* Photos */}
                    {post.photos.length > 0 && (
                      <div className="mb-4 flex space-x-2 overflow-x-auto">
                        {post.photos.map(photo => (
                          <img key={photo.id} src={photo.url} className="h-24 rounded border" alt="Photo intervention" />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="mr-1" size={16} />
                        {post.location}
                      </div>
                      <div className="flex items-center">
                        <CalendarDays className="mr-1" size={16} />
                        {post.date}
                      </div>
                    </div>
                    
                    {/* Fiche technique */}
                    <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Fiche technique recommandée</h4>
                        <button 
                          onClick={() => {
                            setSelectedPost(post);
                            setShowTechSheet(true);
                          }}
                          className="text-blue-600 text-sm"
                        >
                          Voir détails
                        </button>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Durée:</span> {post.techSheet.duration}
                        </div>
                        <div>
                          <span className="font-medium">Pièces:</span> {post.techSheet.parts.join(", ")}
                        </div>
                      </div>
                    </div>
                    
                    {/* Commentaires */}
                    {post.comments.length > 0 && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="font-medium mb-2">Commentaires:</h4>
                        {post.comments.map(comment => (
                          <div key={comment.id} className="mb-3 last:mb-0">
                            <div className="flex justify-between">
                              <span className="font-medium">{comment.techName}</span>
                              <span className="text-xs text-gray-400">{comment.time}</span>
                            </div>
                            <p className="text-gray-600">{comment.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Ajout commentaire/photo */}
                    <div className="mt-4 space-y-2">
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Ajouter un commentaire..."
                          className="flex-1 border rounded-r-none p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
                        >
                          Envoyer
                        </button>
                      </div>
                      <label className="flex items-center justify-center p-2 border border-dashed rounded cursor-pointer">
                        <Camera className="mr-2 text-gray-400" size={16} />
                        <span className="text-sm">Ajouter une photo</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(post.id, e)}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t flex justify-end space-x-3">
                    <button 
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      onClick={() => handleAcceptRequest(post.id)}
                    >
                      Accepter
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Enregistrer
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carte des interventions */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow p-4 sticky top-4">
                <h3 className="font-bold mb-3">Localisation des demandes</h3>
                <div className="h-96 rounded-lg overflow-hidden">
                  <Suspense fallback={<div className="h-full flex items-center justify-center">Chargement de la carte...</div>}>
                    <MapComponent interventions={publicPosts} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Rendez-vous */}
        {activeTab === "private" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Mon Planning</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Aujourd'hui</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium">Réparation chauffe-eau</span>
                        <span className="text-sm text-gray-500">10h - 12h</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm">
                        <MapPin className="mr-1" size={14} />
                        <span>12 Rue de Paris, Lyon</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Demain</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium">Installation climatisation</span>
                        <span className="text-sm text-gray-500">14h - 16h</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm">
                        <MapPin className="mr-1" size={14} />
                        <span>5 Avenue Victor Hugo, Paris</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Statistiques */}
        {activeTab === "stats" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Mes Statistiques</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <StatCard 
                  icon={<TrendingUp size={20} />} 
                  title="Interventions" 
                  value={stats.interventions} 
                  trend="+12%" 
                />
                <StatCard 
                  icon={<Clock size={20} />} 
                  title="Temps moyen" 
                  value={stats.avgTime} 
                  trend="-5%" 
                />
                <StatCard 
                  icon={<Star size={20} />} 
                  title="Satisfaction" 
                  value={stats.satisfaction} 
                  trend="stable" 
                />
                <StatCard 
                  icon={<Euro size={20} />} 
                  title="Revenu mensuel" 
                  value={stats.revenue} 
                  trend="+8%" 
                />
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-4">Inventaire</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stock.map(item => (
                    <div key={item.id} className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Stock restant</p>
                      </div>
                      <span className={`text-lg font-bold ${item.quantity < 3 ? 'text-red-500' : 'text-green-500'}`}>
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                  ))}
                  <button className="p-3 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:border-green-300 hover:text-green-500">
                    <Plus className="mr-2" size={18} />
                    Commander des pièces
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fiche technique modale */}
      {showTechSheet && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Fiche technique: {selectedPost.problem}</h3>
                <button 
                  onClick={() => setShowTechSheet(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Étapes de réparation:</h4>
                  <ol className="list-decimal pl-5 space-y-1">
                    {selectedPost.techSheet.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Pièces nécessaires:</h4>
                  <ul className="list-disc pl-5">
                    {selectedPost.techSheet.parts.map((part, i) => (
                      <li key={i}>{part}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Durée estimée:</h4>
                    <p>{selectedPost.techSheet.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Équipement de sécurité:</h4>
                    <p>{selectedPost.techSheet.safety.join(", ")}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowTechSheet(false)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assistant AR */}
      {showAR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Assistant Réalité Augmentée</h3>
              <button 
                onClick={() => setShowAR(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
              <p className="text-gray-500">Zone de visualisation AR</p>
            </div>
            
            <div className="space-y-3">
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg">
                Scanner l'équipement
              </button>
              <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg">
                Voir les schémas 3D
              </button>
              <button className="w-full py-2 border border-gray-300 rounded-lg">
                Documentation technique
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Composant StatCard
function StatCard({ icon, title, value, trend }) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 bg-blue-50 rounded-full text-blue-600">
          {icon}
        </div>
      </div>
      <p className={`text-sm mt-2 ${
        trend.startsWith('+') ? 'text-green-500' : 
        trend.startsWith('-') ? 'text-red-500' : 'text-gray-500'
      }`}>
        {trend}
      </p>
    </div>
  );
}