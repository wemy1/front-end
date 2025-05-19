import { Plus, Lock, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DemandTypeSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Que souhaitez-vous faire ?
        </h1>

        {/* Public Demand Card */}
        <div 
          className="mb-6 p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors cursor-pointer"
          onClick={() => navigate('/DemandPublique')}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Globe className="text-green-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Poster une demande publique
              </h2>
              <p className="text-gray-600">
                Tous les offreurs pourront répondre à votre demande.
              </p>
            </div>
          </div>
        </div>

        {/* Private Demand Card */}
        <div 
          className="mb-6 p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors cursor-pointer"
          onClick={() => navigate('/create-private-demand')}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Lock className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Poster une demande privée
              </h2>
              <p className="text-gray-600">
                Seuls les offreurs que vous sélectionnerez pourront répondre à votre demande.
              </p>
            </div>
          </div>
        </div>

        {/* Loyalty Coupons Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Plus className="text-yellow-600" size={20} />
            <span className="font-medium text-yellow-800">
              Postez une demande et obtenez 5 Coupons fidélité
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}