import { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaStar, FaUser, FaChevronLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const TechniciansList = () => {
  const navigate = useNavigate();
  const [wilaya, setWilaya] = useState('');
  
  const [filteredTechs, setFilteredTechs] = useState([]);

  // بيانات الفنيين (يمكن استبدالها بطلب API)
  const allTechnicians = [
    {
      id: 1,
      name: "Mohamed",
      specialty: "Plombier",
      wilaya: "Alger",
      rating: 4.8,
      completedJobs: 124
    },
    {
      id: 2,
      name: "Karim",
      specialty: "Électricien",
      wilaya: "Oran",
      rating: 4.5,
      completedJobs: 89
    },
    {
      id: 3,
      name: "Fatima",
      specialty: "Peintre",
      wilaya: "Alger",
      rating: 4.9,
      completedJobs: 156
    },
    {
      id: 4,
      name: "Ali",
      specialty: "Climatiseur",
      wilaya: "Constantine",
      rating: 4.7,
      completedJobs: 112
    }
  ];

  useEffect(() => {
    if (wilaya) {
      const filtered = allTechnicians.filter(tech => 
        tech.wilaya.toLowerCase().includes(wilaya.toLowerCase())
      );
      setFilteredTechs(filtered);
    } else {
      setFilteredTechs([]);
    }
  }, [wilaya]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-600 hover:text-orange-500 transition"
        >
          <FaChevronLeft className="text-xl" />
        </button>
        <h1 className="text-xl font-bold">Trouver un technicien</h1>
      </header>

      {/* محتوى الصفحة */}
      <main className="max-w-3xl mx-auto py-6 px-4">
        {/* مربع البحث */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative">
            <div className="flex items-center border rounded-lg px-4 py-3 mb-4">
              <FaMapMarkerAlt className="text-orange-500 mr-3" />
              <input
                type="text"
                placeholder="Entrez votre wilaya"
                className="w-full focus:outline-none"
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
              />
              <FaSearch className="text-gray-400" />
            </div>
          </div>

          {/* نتائج البحث */}
          {wilaya && (
            <div className="mt-4">
              <h3 className="font-medium mb-3">
                Techniciens disponibles à {wilaya} ({filteredTechs.length})
              </h3>

              {filteredTechs.length > 0 ? (
                <div className="space-y-4">
                  {filteredTechs.map(tech => (
                    <div key={tech.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-start">
                        <div className="bg-orange-100 rounded-full p-3 mr-4">
                          <FaUser className="text-orange-500 text-xl" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold">{tech.name}</h4>
                          <p className="text-gray-600">{tech.specialty}</p>
                          <div className="flex items-center mt-2">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span className="font-medium">{tech.rating}</span>
                            <span className="text-gray-500 text-sm ml-2">({tech.completedJobs} missions)</span>
                          </div>
                        </div>
                        <button 
                          className="bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600 transition"
                          onClick={() => navigate(`/technician/${tech.id}`)}
                        >
                          Contacter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">
                  Aucun technicien trouvé dans cette wilaya
                </p>
              )}
            </div>
          )}

          {!wilaya && (
            <div className="text-center py-8 text-gray-500">
              <FaMapMarkerAlt className="text-3xl mx-auto mb-3 text-gray-300" />
              <p>Entrez le nom de votre wilaya pour trouver des techniciens près de chez vous</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TechniciansList;