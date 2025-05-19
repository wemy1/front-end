import { FaStar, FaStarHalfAlt, FaRegStar, FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AllReviewsPage = () => {
  const navigate = useNavigate();
  
  // بيانات التقييمات (يمكن استبدالها ببيانات من API)
  const reviews = [
    {
      id: 1,
      user: "Mohamed K.",
      avatar: "/user1.jpg",
      date: "15/06/2023",
      rating: 4.5,
      comment: "الفني كان محترفاً وأنهى العمل في الوقت المحدد، أنصح به بشدة",
      service: "إصلاح سباكة"
    },
    {
      id: 2,
      user: "Samira D.",
      avatar: "/user2.jpg",
      date: "10/06/2023",
      rating: 5,
      comment: "أفضل فني تعاملت معه، دقيق ونظيف في العمل",
      service: "تركيب مكيف"
    },
    {
      id: 3,
      user: "Karim Z.",
      avatar: "/user3.jpg",
      date: "05/06/2023",
      rating: 3,
      comment: "الأداء جيد ولكن تأخر عن الموعد بساعة",
      service: "إصلاح كهرباء"
    },
    {
      id: 4,
      user: "Fatima M.",
      avatar: "/user4.jpg",
      date: "01/06/2023",
      rating: 2.5,
      comment: "لم يكن لديه جميع الأدوات المطلوبة",
      service: "دهان جدران"
    }
  ];

  // حساب المعدل العام
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // دالة لعرض النجوم حسب التقييم
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
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
        <h1 className="text-xl font-bold text-gray-800">Tous les avis</h1>
      </header>

      {/* محتوى الصفحة */}
      <main className="container mx-auto py-6 px-4">
        {/* ملخص التقييمات */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Note moyenne</h2>
          <div className="flex justify-center items-center mb-2">
            {renderStars(averageRating)}
            <span className="ml-2 text-xl font-bold text-gray-800">
              {averageRating.toFixed(1)}/5
            </span>
          </div>
          <p className="text-gray-600">
            Basé sur {reviews.length} avis
          </p>
        </div>

        {/* قائمة التقييمات */}
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-start mb-4">
                {review.avatar ? (
                  <img 
                    src={review.avatar} 
                    alt={review.user} 
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                ) : (
                  <FaUserCircle className="w-12 h-12 text-gray-400 mr-3" />
                )}
                <div>
                  <h3 className="font-medium text-gray-800">{review.user}</h3>
                  <div className="flex items-center mt-1">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-gray-800">{review.comment}</p>
              </div>
              
              <div className="text-sm text-gray-500">
                Service: <span className="text-gray-700">{review.service}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllReviewsPage;