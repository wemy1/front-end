import { WrenchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {  BoltIcon as LightningIcon } from "lucide-react";

function SpecialitiesButton() {
  return (
    <Link 
      to="/specialites" 
      className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200"
    >
      <div className="flex items-center space-x-3">
        <div className="bg-green-100 p-2 rounded-full">
          <WrenchIcon className="text-green-600" size={20} />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">Bricolage - Petits travaux</h3>
          <p className="text-sm text-gray-500">33 Particuliers et 18 Professionnels</p>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium text-gray-700">4.5/5</span>
        <span className="text-xs text-gray-500">(2 avis)</span>
      </div>
    </Link>
  );
}

// Pour l'utiliser dans votre composant :
 export default function ContactOffreurs() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Contacter des offreurs</h1>
      
      {/* Section Recherche */}
      <div className="mb-8">
        {/* Votre composant de recherche ici */}
      </div>
      
      {/* Section Spécialités */}
      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-gray-700">
          Retrouvez ici vos offreurs favoris pour pouvoir les contacter plus rapidement.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SpecialitiesButton />
          
          {/* Vous pouvez ajouter d'autres boutons de spécialités */}
          <Link 
            to="/specialites/electricite" 
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <LightningIcon className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Électricité</h3>
                <p className="text-sm text-gray-500">28 Particuliers et 15 Professionnels</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-700">4.6/5</span>
              <span className="text-xs text-gray-500">(47 avis)</span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Liste des offreurs */}
      <div className="space-y-4">
        {/* Vos composants d'offreurs ici */}
      </div>
    </div>
  );
}