import { FaStar, FaStarHalfAlt, FaRegStar, FaArrowLeft, FaUserCircle, FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RequestHistory = () => {
  const navigate = useNavigate();

  // بيانات التقييمات (تستبدل ببيانات من API)
  const clientReviews = [
    {
      id: 1,
      technician: "Mohamed K.",
      avatar: "/tech1.jpg",
      date: "15/06/2023",
      rating: 4,
      comment: "عمل جيد لكن تأخر قليلاً في الوصول",
      service: "إصلاح تسرب مياه",
      response: "شكراً على ملاحظتك، سنحسن التوقيت في المستقبل"
    },
    {
      id: 2,
      technician: "Samir D.",
      avatar: "/tech2.jpg",
      date: "10/06/2023",
      rating: 5,
      comment: "محترف جداً ونظيف في العمل",
      service: "تركيب مكيف هواء",
      response: null
    },
    {
      id: 3,
      technician: "Karim M.",
      avatar: "/tech3.jpg",
      date: "05/06/2023",
      rating: 3,
      comment: "السعر كان مرتفعاً قليلاً",
      service: "إصلاح كهرباء",
      response: "نعتذر، الأسعار حسب تعريفة النقابة"
    }
  ];

  // حساب المعدل العام
  const averageRating = clientReviews.reduce((acc, review) => acc + review.rating, 0) / clientReviews.length;

  // دالة لعرض النجوم
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else if (i === Math.ceil(rating) && rating % 1 > 0) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 inline" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 inline" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-600 hover:text-green-600 transition"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Mes Avis</h1>
      </header>

      {/* محتوى الصفحة */}
      <main className="container mx-auto py-6 px-4">
        {/* ملخص التقييمات */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ma Note Moyenne</h2>
          <div className="flex justify-center items-center mb-2">
            {renderStars(averageRating)}
            <span className="ml-2 text-xl font-bold text-gray-800">
              {averageRating.toFixed(1)}/5
            </span>
          </div>
          <p className="text-gray-600">
            Basé sur {clientReviews.length} avis donnés
          </p>
        </div>

        {/* قائمة التقييمات */}
        <div className="space-y-4">
          {clientReviews.map(review => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              {/* معلومات الفني */}
              <div className="flex items-start mb-4">
                {review.avatar ? (
                  <img 
                    src={review.avatar} 
                    alt={review.technician} 
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                ) : (
                  <FaUserCircle className="w-12 h-12 text-gray-400 mr-3" />
                )}
                <div>
                  <h3 className="font-medium text-gray-800">{review.technician}</h3>
                  <div className="flex items-center mt-1">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              
              {/* معلومات الخدمة */}
              <div className="mb-3 flex items-center text-sm text-gray-600">
                <FaTools className="mr-2" />
                <span>{review.service}</span>
              </div>
              
              {/* تعليق العميل */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-800 font-medium">Votre avis :</p>
                <p className="text-gray-700 mt-1">{review.comment}</p>
              </div>
              
              {/* رد الفني (إذا موجود) */}
              {review.response && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-green-800 font-medium">Réponse du technicien :</p>
                  <p className="text-green-700 mt-1">{review.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RequestHistory;
