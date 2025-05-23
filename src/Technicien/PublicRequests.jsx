"use client"

import { useState } from "react"

export default function PublicRequests() {
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const requests = [
    {
      id: 1,
      title: "Panne de lave-vaisselle",
      description: "Mon lave-vaisselle ne démarre plus depuis ce matin. Voyant rouge allumé.",
      client: "Sophie Martin",
      location: "Paris 15ème",
      distance: "2.3 km",
      category: "electromenager",
      urgency: "normal",
      budget: "80-120€",
      posted: "Il y a 15 min",
      responses: 3,
    },
    {
      id: 2,
      title: "Fuite d'eau sous évier",
      description: "Grosse fuite sous l'évier de cuisine, eau qui coule en continu.",
      client: "Marc Dubois",
      location: "Paris 12ème",
      distance: "4.1 km",
      category: "plomberie",
      urgency: "urgent",
      budget: "100-150€",
      posted: "Il y a 32 min",
      responses: 8,
    },
    {
      id: 3,
      title: "Prise électrique qui grésille",
      description: "Une prise dans le salon fait des étincelles et grésille.",
      client: "Anne Leroy",
      location: "Paris 11ème",
      distance: "1.8 km",
      category: "electricite",
      urgency: "urgent",
      budget: "60-100€",
      posted: "Il y a 1h",
      responses: 5,
    },
    {
      id: 4,
      title: "Réparation climatisation",
      description: "Climatisation qui ne refroidit plus, ventilateur fonctionne mais pas de froid.",
      client: "Pierre Moreau",
      location: "Paris 8ème",
      distance: "3.7 km",
      category: "climatisation",
      urgency: "normal",
      budget: "120-200€",
      posted: "Il y a 2h",
      responses: 2,
    },
  ]

  const filteredRequests = requests.filter((request) => {
    if (filter === "all") return true
    return request.category === filter
  })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Demandes Publiques</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Toutes catégories</option>
            <option value="electromenager">Électroménager</option>
            <option value="plomberie">Plomberie</option>
            <option value="electricite">Électricité</option>
            <option value="climatisation">Climatisation</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="recent">Plus récent</option>
            <option value="distance">Distance</option>
            <option value="budget">Budget</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  )
}

function RequestCard({ request }) {
  const getCategoryIcon = (category) => {
    const icons = {
      electromenager: "🔌",
      plomberie: "🔧",
      electricite: "⚡",
      climatisation: "❄️",
    }
    return icons[category] || "🔧"
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="text-3xl bg-gray-50 p-2 rounded-lg">{getCategoryIcon(request.category)}</div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              request.urgency === "urgent" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
            }`}
          >
            {request.urgency === "urgent" ? "URGENT" : "Normal"}
          </span>
          <span className="text-xs text-gray-500">{request.posted}</span>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">{request.title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{request.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Client</span>
          <span className="text-gray-900">{request.client}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Lieu</span>
          <span className="text-gray-900">{request.location}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Distance</span>
          <span className="text-gray-900">{request.distance}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Budget</span>
          <span className="text-green-600 font-semibold">{request.budget}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">{request.responses} technicien(s) intéressé(s)</div>
        <div className="flex gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Je suis intéressé
          </button>
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Détails
          </button>
        </div>
      </div>
    </div>
  )
}
