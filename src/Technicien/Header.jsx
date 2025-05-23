"use client"

export default function Header({ activeSection, setActiveSection, setSidebarOpen }) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 h-[70px] flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-2xl p-2" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
        <div className="flex flex-col">
          <h1 className="text-blue-600 text-xl md:text-2xl font-bold">SaneaTi</h1>
          <span className="text-gray-500 text-xs md:text-sm">Technicien</span>
        </div>
      </div>

      <nav className="hidden md:flex gap-2">
        <button
          className={`px-4 py-3 rounded-lg text-sm transition-all whitespace-nowrap ${
            activeSection === "requests" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveSection("requests")}
        >
          📋 Demandes Publiques
        </button>
        <button
          className={`px-4 py-3 rounded-lg text-sm transition-all whitespace-nowrap ${
            activeSection === "private" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveSection("private")}
        >
          🔒 Demandes Privées
        </button>
        <button
          className={`px-4 py-3 rounded-lg text-sm transition-all whitespace-nowrap ${
            activeSection === "stats" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveSection("stats")}
        >
          📊 Statistiques
        </button>
        <button
          className={`px-4 py-3 rounded-lg text-sm transition-all whitespace-nowrap ${
            activeSection === "appointments" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveSection("appointments")}
        >
          📅 Mes Rendez-vous
        </button>
        <button
          className={`px-4 py-3 rounded-lg text-sm transition-all whitespace-nowrap ${
            activeSection === "profile" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveSection("profile")}
        >
          👤 Profil
        </button>
      </nav>

      <div className="flex items-center">
        <div className="relative text-2xl cursor-pointer p-2">
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            3
          </span>
          🔔
        </div>
      </div>
    </header>
  )
}
