import React, { useState } from 'react';
import { HomeIcon, UsersIcon, PlusCircleIcon, BarChart3Icon, MessageCircleIcon, GlobeIcon, TagIcon, ChevronDownIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomeClient() {
  const [messageText, setMessageText] = useState('');
  
  return (
    <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm flex justify-between items-center px-4 py-2">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-green-500 font-bold text-2xl">san</span>
            <span className="text-red-500 font-bold text-2xl">eati</span>
          </div>
          <div className="text-xs text-gray-500">Algerie(   )</div>
        </div>
        
        {/* Navigation */}
        <nav className="flex gap-6">
          <div className="flex flex-col items-center text-green-500">
            <HomeIcon className="w-6 h-6" />
            <span className="text-sm">Accueil</span>
          </div>
          <div className="flex flex-col items-center text-gray-500 hover:text-gray-700">
            <UsersIcon className="w-6 h-6" />
            <span className="text-sm">Offreurs</span>
          </div>
          <Link to="/DemandTypeSelection" className="flex flex-col items-center text-gray-500 hover:text-gray-700">
  <PlusCircleIcon className="w-6 h-6" />
  <span className="text-sm">Demande</span>
</Link>
          
          <Link 
  to="/ChatInterface" 
  className="flex flex-col items-center text-gray-500 hover:text-gray-700 hover:no-underline"
>
  <MessageCircleIcon className="w-6 h-6" />
  <span className="text-sm">Messages</span>
</Link>
        </nav>
        {/* User Profile */}
        <Link 
  to="/ProfilePage" 
  className="flex items-center gap-2 cursor-pointer"
>
  <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
    <img 
      src="/placeholder.svg?height=40&width=40" 
      alt="Avatar" 
      className="w-full h-full object-cover"
    />
  </div>
  <div className="flex items-center">
    <span className="text-gray-700">Wemy S.</span>
    <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full text-xs ml-1">1</span>
  </div>
  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
</Link>
      </header>
      
      {/* Main Content */}
      <main className="flex flex-col md:flex-row gap-4 p-4">
        {/* Left Column */}
        <div className="md:w-2/3 space-y-4">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Marhba bik </h2>
            <div>
              <input 
                type="text" 
                placeholder="De quoi avez-vous besoin aujourd'hui ?" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          
          {/* Public Demand Section */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <div className="flex items-center">
                <GlobeIcon className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-800">Demande publique</h3>
              </div>
              <div className="text-sm text-gray-500">postée à 09:45</div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img 
                    src="/placeholder.svg?height=60&width=60" 
                    alt="Salima" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Salima</h4>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Bonjour, j'habite Strasbourg et je cherche une femme âgée ou jeune. Ça m'est 
                  égal pour faire des voyages de temps en temps ou faire des belles sorties. J'aime 
                  bien voyager. Si quelqu'un l'intéresse.
                </p>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/placeholder.svg?height=300&width=600" 
                    alt="Image de la demande" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="md:w-1/3 space-y-4">
          {/* Public Demand Form */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-4">
              <GlobeIcon className="w-6 h-6 text-gray-700 mr-2" />
              <h3 className="text-xl font-medium text-gray-800">Demande publique</h3>
            </div>
            
            <div>
              <p className="text-gray-700 mb-2">Décrivez votre besoin</p>
              <textarea 
                placeholder="Bonjour," 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 mb-4"
              ></textarea>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-1">Ajoutez des photos</h4>
                <p className="text-sm text-gray-600">
                  Augmentez vos chances de faire affaire de 25% en illustrant votre besoin.
                </p>
              </div>
              
              <button className="w-full py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                Poster ma demande
              </button>
            </div>
          </div>
          
         
          
        </div>
      </main>
    </div>
  );
}

export default HomeClient;