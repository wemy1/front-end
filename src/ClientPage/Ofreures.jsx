"use client"

import { useState, useRef, useEffect } from "react"
import {
  Recycle, HelpingHand, Sprout, Palette, Home, Fence, GlassWater,
  Lightbulb, Wrench, Scissors, Hammer, Droplet, Plug, Brush, ChevronRight,
  ChevronLeft, Star, MapPin, Share2, Search, Heart, Sun, Snowflake, X,
  ChevronDown, Clock, CheckCircle, Phone, MessageSquare, Calendar
} from "lucide-react"

// Liste des wilayas algériennes
const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna",
  "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
  "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou",
  "Alger", "Djelfa", "Jijel", "Sétif", "Saïda",
  "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine",
  "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla",
  "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès",
  "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
  "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma",
  "Aïn Témouchent", "Ghardaïa", "Relizane"
]

export default function ArtisansPage() {
  const [favorites, setFavorites] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWilaya, setSelectedWilaya] = useState("")
  const [showWilayaDropdown, setShowWilayaDropdown] = useState(false)
  const [showProviderModal, setShowProviderModal] = useState(null)
  const scrollRef = useRef(null)

  // Fonction pour le défilement horizontal
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })

  // Catégories de services
   const serviceCategories = [
    { icon: <Hammer size={24}/>, label: "Montage", subLabel: "Meubles" },
    { icon: <Droplet size={24}/>, label: "Plomberie", subLabel: "Fuites" },
    { icon: <Plug size={24}/>, label: "Électricité", subLabel: "Prises" },
    { icon: <Brush size={24}/>, label: "Peinture", subLabel: "Murs" },
    { icon: <Recycle size={24}/>, label: "Récupération", subLabel: "Recyclage" },
    { icon: <HelpingHand size={24}/>, label: "Aide", subLabel: "Seniors" },
    { icon: <Sprout size={24}/>, label: "Jardinage", subLabel: "Plantes" },
    { icon: <Palette size={24}/>, label: "Décoration", subLabel: "Intérieur" },
    { icon: <Home size={24}/>, label: "Ménage", subLabel: "Nettoyage" },
    { icon: <Fence size={24}/>, label: "Extérieur", subLabel: "Clôtures" },
    { icon: <GlassWater size={24}/>, label: "Vitres", subLabel: "Nettoyage" },
    { icon: <Lightbulb size={24}/>, label: "Éclairage", subLabel: "Installation" },
    { icon: <Wrench size={24}/>, label: "Réparation", subLabel: "Dépannage" },
    { icon: <Scissors size={24}/>, label: "Taille", subLabel: "Haies" }
  ]

  // Services saisonniers
    const seasonalServices = [
    { icon: <Sun size={24} />, label: "Été", services: ["Pergolas", "Ventilateurs", "Climatisation"] },
    { icon: <Snowflake size={24} />, label: "Hiver", services: ["Chauffage", "Isolation", "Dégivrage"] }
  ]

  // Liste des techniciens
  const providers = [
    {
      id: 1,
      name: "Karim M.",
      profession: "Plombier-électricien",
      rating: 4.7,
      reviews: 42,
      distance: "1.2 km",
      wilaya: "Alger",
      online: true,
      skills: ["Robinetterie", "Installation sanitaire", "Dépannage électrique"],
      images: ["/77cb0656cef2d28dad9b6335edb2a1dd.jpg", "/d0bc774c-9b0f-4e25-b0bf-c7251136b6d7.jpg", "/20df0f05-156a-4e9f-bf6b-7f7296ef0614.jpg"],
      type: "Professionnel",
      price: "À partir de 1500 DA",
      about: "Plombier avec 10 ans d'expérience, spécialisé dans la rénovation et le dépannage urgent.",
      availability: "Disponible aujourd'hui",
      responseTime: "Répond en moins de 30 minutes"
    },
    // ... (autres techniciens)
  ]

  // Filtrage des techniciens
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = searchTerm === "" || 
      provider.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      provider.profession.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesWilaya = selectedWilaya === "" || provider.wilaya === selectedWilaya
    
    const matchesCategory = selectedCategory === "Tous" || 
      serviceCategories.find(cat => cat.label === selectedCategory)?.subLabel.toLowerCase()
        .includes(provider.profession.toLowerCase())

    return matchesSearch && matchesWilaya && matchesCategory
  })

  // Gestion des favoris
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50">
      {/* Sidebar des favoris */}
      <div className="w-full md:w-80 border-r border-gray-200 p-4 bg-white">
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2 text-xl font-bold mb-4">
            <Heart className="text-pink-500 fill-pink-500" size={24} />
            <span>Mes favoris ({favorites.length})</span>
          </div>
        </div>

        {favorites.length > 0 ? (
          <div className="space-y-3">
            {providers.filter(p => favorites.includes(p.id)).map(provider => (
              <div key={provider.id} className="p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <img src="/placeholder-avatar.jpg" alt={provider.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-medium">{provider.name}</h4>
                    <p className="text-sm text-gray-600">{provider.profession}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="relative w-40 h-24 mb-4">
              <div className="absolute top-4 left-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Wrench className="text-blue-500" size={20} />
              </div>
              <div className="absolute top-6 left-16 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Home className="text-green-500" size={20} />
              </div>
            </div>
            <p className="text-gray-600">
              Retrouvez ici vos artisans favoris pour un accès rapide à leurs services.
            </p>
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-4 md:p-6">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Artisans & Services</h1>
            <p className="text-gray-600">Trouvez le professionnel qu'il vous faut</p>
          </div>
          <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition">
            <Share2 size={18} />
            <span>Partager</span>
          </button>
        </div>

        {/* Barre de recherche améliorée */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une spécialité ou un artisan..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="text-gray-400 hover:text-gray-600" size={18} />
              </button>
            )}
          </div>

          {/* Sélecteur de wilaya amélioré */}
          <div className="relative flex-1">
            <button 
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white text-left hover:border-gray-400"
              onClick={() => setShowWilayaDropdown(!showWilayaDropdown)}
            >
              <div className="flex items-center">
                <MapPin className="text-gray-400 mr-2" size={18} />
                <span>{selectedWilaya || "Toutes wilayas"}</span>
              </div>
              <ChevronDown className={`text-gray-400 transition-transform ${showWilayaDropdown ? 'rotate-180' : ''}`} size={16} />
            </button>

            {showWilayaDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                <div className="sticky top-0 bg-white p-2 border-b">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher une wilaya..."
                      className="w-full pl-8 pr-3 py-2 border rounded"
                    />
                    <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
                  </div>
                </div>
                <ul className="divide-y divide-gray-200">
                  <li 
                    className={`p-3 hover:bg-gray-50 cursor-pointer ${!selectedWilaya ? 'bg-blue-50' : ''}`}
                    onClick={() => {
                      setSelectedWilaya("")
                      setShowWilayaDropdown(false)
                    }}
                  >
                    <div className="flex items-center">
                      <MapPin className="mr-2 text-gray-500" size={16} />
                      <span>Toutes wilayas</span>
                    </div>
                  </li>
                  {WILAYAS.map((wilaya) => (
                    <li
                      key={wilaya}
                      className={`p-3 hover:bg-gray-50 cursor-pointer ${selectedWilaya === wilaya ? 'bg-blue-50' : ''}`}
                      onClick={() => {
                        setSelectedWilaya(wilaya)
                        setShowWilayaDropdown(false)
                      }}
                    >
                      {wilaya}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center justify-center gap-2">
            <Search size={18} />
            <span>Rechercher</span>
          </button>
        </div>

        {/* Catégories de services avec défilement horizontal */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Catégories de services</h2>
            <button 
              onClick={() => setSelectedCategory("Tous")}
              className={`text-sm px-3 py-1 rounded-full ${selectedCategory === "Tous" ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Tout afficher
            </button>
          </div>

          <div className="relative">
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <ChevronLeft className="text-gray-700" size={20} />
            </button>
            
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto scroll-smooth space-x-4 py-2 px-8 hide-scrollbar"
            >
              {serviceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.label)}
                  className={`flex flex-col items-center p-4 rounded-xl transition flex-shrink-0 w-28 ${selectedCategory === category.label ? 'bg-green-50 border-2 border-green-400' : 'bg-white border border-gray-200 hover:border-green-300'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${category.color}`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium text-center">{category.label}</span>
                  <span className="text-xs text-gray-500 text-center mt-1">{category.subLabel}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <ChevronRight className="text-gray-700" size={20} />
            </button>
          </div>
        </div>

        {/* Services saisonniers */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Services saisonniers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonalServices.map((season, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    {season.icon}
                  </div>
                  <h3 className="font-bold text-lg">{season.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {season.services.map((service, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Liste des techniciens */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {selectedCategory === "Tous" ? "Tous les artisans" : `Artisans en ${selectedCategory}`}
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredProviders.length} {filteredProviders.length !== 1 ? 'professionnels' : 'professionnel'})
              </span>
            </h2>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Trier par :</span>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white">
                <option>Pertinence</option>
                <option>Note</option>
                <option>Distance</option>
                <option>Prix</option>
              </select>
            </div>
          </div>

          {filteredProviders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <div 
                  key={provider.id} 
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer"
                  onClick={() => setShowProviderModal(provider)}
                >
                  <div className="p-5">
                    <div className="flex gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-200">
                          <img
                            src="/placeholder-avatar.jpg"
                            alt={provider.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {provider.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{provider.name}</h3>
                            <p className="text-sm text-gray-600">{provider.profession}</p>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(provider.id)
                            }}
                            className="text-gray-400 hover:text-pink-500 transition"
                          >
                            <Heart 
                              size={20} 
                              className={favorites.includes(provider.id) ? "fill-pink-500 text-pink-500" : ""} 
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center mt-2 gap-4">
                          <div className="flex items-center">
                            <Star className="fill-yellow-400 text-yellow-400" size={16} />
                            <span className="ml-1 font-medium">{provider.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({provider.reviews})</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin size={14} className="mr-1" />
                            {provider.distance}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {provider.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                        {provider.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            +{provider.skills.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {provider.images.slice(0, 3).map((img, index) => (
                          <div key={index} className="h-20 rounded-md overflow-hidden bg-gray-100">
                            <img
                              src={img}
                              alt={`Travail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="font-medium text-green-600">{provider.price}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${provider.type === "Professionnel" ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>
                            {provider.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
              <button 
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Tous")
                  setSelectedWilaya("")
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de détail du technicien */}
      {showProviderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
              <h3 className="text-xl font-bold">{showProviderModal.name}</h3>
              <button 
                onClick={() => setShowProviderModal(null)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Colonne gauche */}
                <div className="md:w-1/3">
                  <div className="mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-200 mx-auto mb-4">
                      <img
                        src="/placeholder-avatar.jpg"
                        alt={showProviderModal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="text-center">
                      <h4 className="font-bold text-lg">{showProviderModal.name}</h4>
                      <p className="text-gray-600">{showProviderModal.profession}</p>
                      <div className="flex items-center justify-center mt-2">
                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                        <span className="ml-1 font-medium">{showProviderModal.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({showProviderModal.reviews} avis)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Localisation</h5>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span>{showProviderModal.wilaya}</span>
                        <span className="text-gray-500">({showProviderModal.distance})</span>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Disponibilité</h5>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span>{showProviderModal.availability}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Temps de réponse</h5>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-gray-500" />
                        <span>{showProviderModal.responseTime}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h5 className="font-medium text-gray-700 mb-2">Tarifs</h5>
                      <p className="text-green-600 font-medium">{showProviderModal.price}</p>
                    </div>
                  </div>
                </div>
                
                {/* Colonne droite */}
                <div className="md:w-2/3">
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-3">À propos</h4>
                    <p className="text-gray-700">{showProviderModal.about}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-3">Compétences</h4>
                    <div className="flex flex-wrap gap-2">
                      {showProviderModal.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-3">Réalisations</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {showProviderModal.images.map((img, index) => (
                        <div key={index} className="h-32 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={img}
                            alt={`Réalisation ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                      <Phone size={18} />
                      <span>Appeler</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                      <MessageSquare size={18} />
                      <span>Message</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
                      <Calendar size={18} />
                      <span>Réserver</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}