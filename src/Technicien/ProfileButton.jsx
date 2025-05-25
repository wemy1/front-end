"use client";
import React, { useState } from 'react';
import { User, Edit, Star, Briefcase, MapPin, Clock, Phone, Mail, Calendar, Settings, WrenchIcon, LogOut, ChevronDown } from 'lucide-react';

export default function ProfileButton() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [technicien, setTechnicien] = useState({
    name: "Mohamed Amine",
    specialite: "Plomberie",
    ville: "Alger",
    note: 4.7,
    experience: "5 ans",
    phone: "+213 123 456 789",
    email: "amine.plombier@example.com",
    bio: "Technicien spécialisé en plomberie résidentielle avec expertise dans la réparation de fuites et l'installation de systèmes sanitaires.",
    disponibilite: "Disponible",
    tarif: "1500 DA/heure"
  });

  const [services, setServices] = useState([
    { id: 1, name: "Réparation de fuites", price: "2000 DA" },
    { id: 2, name: "Installation sanitaire", price: "5000 DA" },
    { id: 3, name: "Débouchage WC", price: "2500 DA" }
  ]);

  const [reviews, setReviews] = useState([
    { id: 1, client: "Karim B.", rating: 5, comment: "Travail rapide et professionnel", date: "15/05/2025" },
    { id: 2, client: "Leila M.", rating: 4, comment: "Bon service mais un peu en retard", date: "10/05/2025" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTechnicien(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
                        <span className="text-green-600">
                          <WrenchIcon />
                        </span>
                        <span className="text-green-500 font-bold text-2xl">san</span>
                        <span className="text-black font-bold text-2xl">eati</span>
                      </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="text-gray-600" size={20} />
            </button>
            <button className="flex items-center text-red-500">
              <LogOut className="mr-1" size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden">
                    <User size={48} className="text-emerald-600" />
                  </div>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full"
                  >
                    <Edit size={16} />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-center">{technicien.name}</h2>
                <p className="text-gray-600 text-center">{technicien.specialite}</p>

                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < Math.floor(technicien.note) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-1 text-gray-600">{technicien.note}</span>
                </div>

                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center">
                    <Briefcase className="text-gray-500 mr-2" size={18} />
                    <span>{technicien.experience} d'expérience</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="text-gray-500 mr-2" size={18} />
                    <span>{technicien.ville}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-gray-500 mr-2" size={18} />
                    <span className={`${technicien.disponibilite === 'Disponible' ? 'text-emerald-500' : 'text-red-500'}`}>
                      {technicien.disponibilite}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="text-gray-500 mr-2" size={18} />
                    <span>{technicien.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-gray-500 mr-2" size={18} />
                    <span>{technicien.email}</span>
                  </div>
                </div>

                <div className="w-full mt-6 bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-medium text-emerald-700 mb-2">Tarif horaire</h4>
                  <p className="text-2xl font-bold">{technicien.tarif}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 py-3 font-medium text-center ${activeTab === 'profile' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600'}`}
                >
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`flex-1 py-3 font-medium text-center ${activeTab === 'services' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600'}`}
                >
                  Mes Services
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-3 font-medium text-center ${activeTab === 'reviews' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600'}`}
                >
                  Avis ({reviews.length})
                </button>
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`flex-1 py-3 font-medium text-center ${activeTab === 'calendar' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600'}`}
                >
                  Calendrier
                </button>
              </div>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Informations du profil</h3>
                  {isEditing ? (
                    <button 
                      onClick={handleSave}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
                    >
                      Enregistrer
                    </button>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center text-emerald-600"
                    >
                      <Edit size={16} className="mr-1" />
                      Modifier
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                      <input
                        type="text"
                        name="name"
                        value={technicien.name}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
                      <input
                        type="text"
                        name="specialite"
                        value={technicien.specialite}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                      <input
                        type="text"
                        name="ville"
                        value={technicien.ville}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <input
                        type="text"
                        name="phone"
                        value={technicien.phone}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={technicien.email}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tarif horaire</label>
                      <input
                        type="text"
                        name="tarif"
                        value={technicien.tarif}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilité</label>
                      <select
                        name="disponibilite"
                        value={technicien.disponibilite}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                      >
                        <option value="Disponible">Disponible</option>
                        <option value="Non disponible">Non disponible</option>
                        <option value="Vacances">En vacances</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={technicien.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full border rounded-lg p-2"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">À propos</h4>
                    <p className="text-gray-600 mb-6">{technicien.bio}</p>

                    <h4 className="font-medium text-gray-800 mb-2">Statistiques</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-emerald-600">24</p>
                        <p className="text-sm text-gray-600">Interventions</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-emerald-600">{technicien.note}/5</p>
                        <p className="text-sm text-gray-600">Note moyenne</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-emerald-600">18</p>
                        <p className="text-sm text-gray-600">Clients satisfaits</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-emerald-600">92%</p>
                        <p className="text-sm text-gray-600">Taux de réussite</p>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-800 mb-2">Certifications</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Aucune certification pour le moment</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Mes Services</h3>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
                    Ajouter un service
                  </button>
                </div>

                <div className="space-y-4">
                  {services.map(service => (
                    <div key={service.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-emerald-600 font-bold">{service.price}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-500 hover:text-emerald-600">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-6">Avis clients</h3>
                
                {reviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucun avis pour le moment</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {reviews.map(review => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{review.client}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <p className="text-sm text-gray-400">{review.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-6">Calendrier des rendez-vous</h3>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Calendar className="mx-auto text-gray-400" size={48} />
                  <p className="mt-4 text-gray-600">Aucun rendez-vous programmé</p>
                  <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg">
                    Voir disponibilités
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}