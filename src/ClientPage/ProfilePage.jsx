import { useState } from 'react';
import { FaUser, FaEdit, FaHistory, FaCreditCard, FaQuestionCircle, FaSignOutAlt, FaArrowLeft, FaCamera, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "Ahmed",
    email: "ahmed@quickfixdz.com",
    phone: "+213123456789",
    address: "Alger Centre, Alger",
    joinDate: "15/03/2022",
    completedRequests: 12,
    rating: 4.2,
    reviewCount: 8,
    notifications: {
      email: true,
      sms: false
    }
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    // Effacer toutes les données de session
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    
    // Rediriger vers la page de connexion
    navigate('/Connexion', { replace: true });
    
    // Rafraîchir pour nettoyer l'état de l'application
    window.location.reload();
  };

  const handleNotificationToggle = (type) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-600 hover:text-green-600 transition">
          <FaArrowLeft className="text-xl" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Mon profil</h1>
      </header>

      <main className="max-w-3xl mx-auto py-6 px-4">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="text-green-600 text-3xl" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition cursor-pointer">
                <FaCamera className="text-sm" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
            <p className="text-gray-600">{userData.email}</p>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div className="p-3 border-b border-gray-200 flex justify-between">
              <span className="text-gray-600">Téléphone</span>
              <span className="text-gray-800">{userData.phone}</span>
            </div>
            <div className="p-3 border-b border-gray-200 flex justify-between">
              <span className="text-gray-600">Adresse</span>
              <span className="text-gray-800">{userData.address}</span>
            </div>
            <div className="p-3 border-b border-gray-200 flex justify-between">
              <span className="text-gray-600">Membre depuis</span>
              <span className="text-gray-800">{userData.joinDate}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-gray-600">Demandes complétées</span>
              <span className="text-gray-800">{userData.completedRequests}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-200">
            <div className="text-green-600 font-bold text-xl">{userData.completedRequests}</div>
            <div className="text-gray-600 text-sm">Demandes</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-200">
            <div className="text-green-600 font-bold text-xl">{userData.rating.toFixed(1)}</div>
            <div className="text-gray-600 text-sm">Évaluation</div>
          </div>
        </div>

        {/* Ratings Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Vos évaluations</h3>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`${i < Math.floor(userData.rating) ? 'text-yellow-400' : 'text-gray-300'} mr-1`} 
              />
            ))}
            <span className="ml-2 text-gray-600">
              {userData.rating.toFixed(1)}/5 ({userData.reviewCount} avis)
            </span>
          </div>
          <button 
            onClick={() => navigate('/AllReviewsPage')}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Voir tous les avis →
          </button>
        </div>

        {/* Notifications Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Préférences de notification</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Notifications par email</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={userData.notifications.email}
                  onChange={() => handleNotificationToggle('email')}
                />
                <div className={`w-11 h-6 rounded-full peer ${userData.notifications.email ? 'bg-green-600' : 'bg-gray-200'}`}>
                  <div className={`absolute top-[2px] left-[2px] bg-white border-gray-300 rounded-full h-5 w-5 transition-all ${userData.notifications.email ? 'translate-x-full' : ''}`}></div>
                </div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Notifications SMS</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={userData.notifications.sms}
                  onChange={() => handleNotificationToggle('sms')}
                />
                <div className={`w-11 h-6 rounded-full peer ${userData.notifications.sms ? 'bg-green-600' : 'bg-gray-200'}`}>
                  <div className={`absolute top-[2px] left-[2px] bg-white border-gray-300 rounded-full h-5 w-5 transition-all ${userData.notifications.sms ? 'translate-x-full' : ''}`}></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <Link to="/RequestHistory" className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition">
            <FaHistory className="text-green-600 mr-3" />
            <span className="text-gray-800">Historique des demandes</span>
          </Link>
          <Link to="/PaymentMethodsPage" className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition">
            <FaCreditCard className="text-green-600 mr-3" />
            <span className="text-gray-800">Méthodes de paiement</span>
          </Link>
          <Link to="/EditProfilePage" className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition">
            <FaEdit className="text-green-600 mr-3" />
            <span className="text-gray-800">Modifier le profil</span>
          </Link>
          <Link to="/HelpSupportPage" className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition">
            <FaQuestionCircle className="text-green-600 mr-3" />
            <span className="text-gray-800">Aide & Support</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center p-4 text-red-500 hover:bg-gray-50 transition"
          >
            <FaSignOutAlt className="mr-3" />
            <span>Déconnexion</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;