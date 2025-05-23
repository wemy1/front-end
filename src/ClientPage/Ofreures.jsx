"use client"

import { useState, useRef } from "react"
import {
  Recycle,
  HelpingHand,
  Sprout,
  Palette,
  Home,
  Fence,
  GlassWater,
  Lightbulb,
  Wrench,
  Scissors,
  Hammer,
  Droplet,
  Plug,
  Brush,
  ChevronRight,
  ChevronLeft,
  Star,
  MapPin,
  Share2,
  Search,
  Heart,
  Sun,
  Snowflake,
  X,
  ChevronDown
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

export default function Ofreures() {
  const [favorites, setFavorites] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWilaya, setSelectedWilaya] = useState("")
  const [showWilayaDropdown, setShowWilayaDropdown] = useState(false)
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
  }

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

  const seasonalServices = [
    { icon: <Sun size={24} />, label: "Été", services: ["Pergolas", "Ventilateurs", "Climatisation"] },
    { icon: <Snowflake size={24} />, label: "Hiver", services: ["Chauffage", "Isolation", "Dégivrage"] }
  ]

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
      images: ["/plumbing1.jpg", "/plumbing2.jpg", "/electrical1.jpg"],
      type: "Professionnel",
      price: "À partir de 1500 DA"
    },
    {
      id: 2,
      name: "Fatima Z.",
      profession: "Jardinier paysagiste",
      rating: 4.9,
      reviews: 28,
      distance: "2.5 km",
      wilaya: "Blida",
      online: false,
      skills: ["Tonte", "Taille haies", "Aménagement"],
      images: ["/garden1.jpg", "/garden2.jpg", "/garden3.jpg"],
      type: "Auto-entrepreneur",
      price: "À partir de 1000 DA/jour"
    }
  ]

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = searchTerm === "" || 
      provider.skills.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      provider.profession.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesWilaya = selectedWilaya === "" || 
      provider.wilaya === selectedWilaya
    
    const matchesCategory = selectedCategory === "Tous" || 
      serviceCategories.find(cat => cat.label === selectedCategory)?.subLabel.toLowerCase().includes(provider.profession.toLowerCase())

    return matchesSearch && matchesWilaya && matchesCategory
  })

  const handleSearch = () => {
    console.log("Recherche effectuée")
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50">
      {/* Favorites sidebar */}
      <div className="w-full md:w-[400px] border-r border-gray-200 p-4 bg-white">
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2 text-xl font-bold mb-4">
            <Heart className="text-pink-500 fill-pink-500" size={24} />
            <span>Mes favoris ({favorites})</span>
          </div>
        </div>

        <div className="py-8 flex flex-col items-center justify-center">
          <div className="relative w-[200px] h-[120px] mb-6">
            <div className="absolute top-10 left-10 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Wrench className="text-blue-500" size={24} />
            </div>
            <div className="absolute top-12 left-24 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Home className="text-green-500" size={24} />
            </div>
          </div>
          <p className="text-center text-gray-700 font-medium">
            Retrouvez ici vos artisans favoris pour un accès rapide à leurs services.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Artisans & Services</h1>
          <button className="border border-gray-300 rounded-full px-6 py-2 flex items-center gap-2 hover:bg-gray-100 transition">
            <Share2 size={20} />
            <span>Partager</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 w-full">
          <div className="relative flex-1 bg-white rounded-lg border border-gray-300 flex items-center">
            <Search className="ml-3 text-gray-500" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une spécialité (plomberie, électricité...)"
              className="w-full p-3 border-none outline-none rounded-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="p-1 mr-2 text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="relative flex-1">
            <div 
              className="bg-white rounded-lg border border-gray-300 p-3 flex items-center cursor-pointer"
              onClick={() => setShowWilayaDropdown(!showWilayaDropdown)}
            >
              <MapPin className="text-gray-500 mr-2" size={20} />
              <span className="flex-1">
                {selectedWilaya || "Toutes wilayas"}
              </span>
              <ChevronDown 
                className={`transition-transform ${showWilayaDropdown ? 'rotate-180' : ''}`} 
                size={16} 
              />
            </div>

            {showWilayaDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <div className="p-2 sticky top-0 bg-white border-b">
                  <input
                    type="text"
                    placeholder="Rechercher une wilaya..."
                    className="w-full p-2 border rounded"
                  />
                </div>
                <ul>
                  <li 
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedWilaya("")
                      setShowWilayaDropdown(false)
                    }}
                  >
                    Toutes wilayas
                  </li>
                  {WILAYAS.map((wilaya) => (
                    <li
                      key={wilaya}
                      className={`p-3 hover:bg-gray-100 cursor-pointer ${selectedWilaya === wilaya ? 'bg-blue-50' : ''}`}
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

          <button 
            onClick={handleSearch}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Rechercher
          </button>
        </div>

        {/* Service categories with horizontal scroll */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Catégories de services</h2>
            <button 
              onClick={() => setSelectedCategory("Tous")}
              className={`text-sm px-3 py-1 rounded-full ${selectedCategory === "Tous" ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Voir tout
            </button>
          </div>

          <div className="relative">
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto scroll-smooth space-x-4 py-2 px-8 hide-scrollbar"
            >
              {serviceCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category.label)}
                  className={`flex flex-col items-center p-3 rounded-lg transition flex-shrink-0 ${selectedCategory === category.label ? 'bg-green-100 border border-green-300' : 'bg-white border border-gray-200 hover:border-green-200'}`}
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-2 text-green-600">
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium text-center">{category.label}</span>
                  <span className="text-xs text-gray-500 text-center">{category.subLabel}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Seasonal services */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Services saisonniers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonalServices.map((season, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    {season.icon}
                  </div>
                  <h3 className="font-bold text-lg">{season.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {season.services.map((service, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service providers */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {selectedCategory === "Tous" ? "Tous les artisans" : `${selectedCategory} - Artisans`}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredProviders.length} {filteredProviders.length > 1 ? "professionnels" : "professionnel"} disponibles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
                <div className="p-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-200">
                      <img
                        src="/placeholder-avatar.jpg"
                        alt={provider.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{provider.name}</h3>
                          <p className="text-sm text-gray-600">{provider.profession}</p>
                          <p className="text-xs text-gray-500">{provider.wilaya}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${provider.type === "Professionnel" ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>
                          {provider.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center mt-2">
                        <div className="flex items-center mr-3">
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
                      {provider.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {provider.images.map((img, index) => (
                        <div key={index} className="h-24 rounded overflow-hidden">
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
                      <button className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition">
                        Contacter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation arrow */}
      <div className="fixed right-4 bottom-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition cursor-pointer">
        <ChevronRight size={24} className="text-gray-700" />
      </div>
    </div>
  )
}