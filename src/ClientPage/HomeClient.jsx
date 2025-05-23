import React, { useState } from 'react';
import { 
  HomeIcon, 
  UsersIcon, 
  PlusCircleIcon, 
  MessageCircleIcon, 
  GlobeIcon, 
  ChevronDownIcon,
  HeartIcon,
  ImageIcon,
  WrenchIcon,
  XIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

function HomeClient() {
  const [messageText, setMessageText] = useState('');
  const [images, setImages] = useState([]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Salah",
      avatar: "/6e599501252c23bcf02658617b29c894.jpg" , 
      time: "09:45",
      content: " ابحث عن دهان يتقن هدا النوع من الدهان لي راه محترف يتصل بيا في اقرب وقت ",
      image: "/5d34c2fa0376ddcfc47e0d6bf9d57a3a.jpg",
      likes: 120,
      comments: 15,
      isLiked: false,
      showComments: false,
      commentText: "",
      commentsList: [
        { id: 1, user: "Ahmed", text: "Je suis intéressé, contactez-moi !" },
        { id: 2, user: "Fatima", text: "Quels types de voyages vous aimez ?" }
      ]
    },
    {
      id: 2,
      user: "Salima",
      avatar: "/0b1eac6393bb87f19c3a8f0310b50a93.jpg" , 
      time: "09:45",
      content: " السلام عليكم عندي مابل قديم حبيت نعطيه فرصة جديدة ادا كاين حرفيين يشرو مابل قديم ولا يديروو اعادة تدوير",
      image: "/a0689674a2c4c6cd9f3966c8d1ad25e2.jpg",
      likes: 120,
      comments: 15,
      isLiked: false,
      showComments: false,
      commentText: "",
      commentsList: [
        { id: 1, user: "Ahmed", text: "Je suis intéressé, contactez-moi !" },
        { id: 2, user: "Fatima", text: "Quels types de voyages vous aimez ?" }
      ]
    },
     {
      id: 1,
      user: "Ibrahim",
      avatar: "/db8f1a34f3544a71be96dd6914938a0d.jpg",
      time: "09:45",
      content: "صرا عندي مشكل فالكهرباء دار شرارة وحرقلي جزء من الحيط كيما راكم تشوفو فالصورة، نحتاج كهربائي محترف باش يجي يشوف المشكل ويصلحو قبل ما يتفاقم",
      image: "/389ad43d22c246c21248482723c45179.jpg",
      likes: 120,
      comments: 15,
      isLiked: false,
      showComments: false,
      commentText: "",
      commentsList: [
        { id: 1, user: "Ahmed", text: "Je suis intéressé, contactez-moi !" },
        { id: 2, user: "Fatima", text: "Quels types de voyages vous aimez ?" }
      ]
    },
  ]);
  const [activeTab, setActiveTab] = useState('accueil');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const toggleComments = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          showComments: !post.showComments
        };
      }
      return post;
    }));
  };

  const handleCommentChange = (postId, text) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentText: text
        };
      }
      return post;
    }));
  };

  const addComment = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.commentText.trim() !== "") {
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [
            ...post.commentsList,
            {
              id: post.commentsList.length + 1,
              user: "Moi",
              text: post.commentText
            }
          ],
          commentText: ""
        };
      }
      return post;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim() === "" && images.length === 0) return;

    const newPost = {
      id: posts.length + 1,
      user: "Wemy S.",
      avatar: "/placeholder.svg",
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      content: messageText,
      images: images.map(img => URL.createObjectURL(img)),
      likes: 0,
      comments: 0,
      isLiked: false,
      showComments: false,
      commentText: "",
      commentsList: []
    };

    setPosts([newPost, ...posts]);
    setMessageText("");
    setImages([]);
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm flex justify-between items-center px-4 py-2">
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
  <span className="text-green-600">
    <WrenchIcon />
  </span>
  <span className="text-green-500 font-bold text-2xl">san</span>
  <span className="text-black-500 font-bold text-2xl">eati</span>
</div>

          <div className="text-xs text-gray-500">Algerie(   )</div>
        </div>
        
        {/* Navigation */}
        <nav className="flex gap-6">
          <button 
            onClick={() => setActiveTab('accueil')}
            className={`flex flex-col items-center ${activeTab === 'accueil' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-sm">Accueil</span>
          </button>
          <Link 
          to="/Ofreures"
            className={`flex flex-col items-center ${activeTab === 'offreurs' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <UsersIcon className="w-6 h-6" />
            <span className="text-sm">Offreurs</span>
          </Link>
          <Link 
            to="/DemandTypeSelection" 
            className="flex flex-col items-center text-gray-500 hover:text-gray-700"
          >
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
              src="/37897c7e661f32721e29167084b03cbf.jpg" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center">
            <span className="text-gray-700">profile</span>
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">كلشي لي تحتاجو فخدمات الدار تلقاه هنا!</h2>
            <div>
              <input 
                type="text" 
                placeholder="De quoi avez-vous besoin aujourd'hui ?" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          
          {/* Public Demand Posts */}
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={post.avatar} 
                      alt={post.user} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{post.user}</h3>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">postée à {post.time}</div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
                
                {post.image && (
                  <div className="rounded-lg overflow-hidden mb-4">
                    <img 
                      src={post.image} 
                      alt="Image de la demande" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                
                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {post.images.map((img, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img 
                          src={img} 
                          alt={`Image ${index}`} 
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between border-t border-b border-gray-100 py-2">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                >
                  <HeartIcon className="w-5 h-5 mr-1" fill={post.isLiked ? 'currentColor' : 'none'} />
                  <span>{post.likes}</span>
                </button>
                
                <button 
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center text-gray-500 hover:text-blue-500"
                >
                  <MessageCircleIcon className="w-5 h-5 mr-1" />
                  <span>{post.comments} Commentaires</span>
                </button>
              </div>
              
              {post.showComments && (
                <div className="mt-4">
                  <div className="space-y-3 mb-4">
                    {post.commentsList.map(comment => (
                      <div key={comment.id} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-2">
                          <img 
                            src="/placeholder.svg" 
                            alt={comment.user} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-2">
                          <p className="font-medium text-sm">{comment.user}</p>
                          <p className="text-gray-700 text-sm">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={post.commentText}
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                        placeholder="Ajouter un commentaire..."
                        className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && addComment(post.id)}
                      />
                    </div>
                    <button 
                      onClick={() => addComment(post.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600"
                      disabled={!post.commentText.trim()}
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Right Column */}
        <div className="md:w-1/3 space-y-4">
          {/* Public Demand Form */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-4">
              <GlobeIcon className="w-6 h-6 text-gray-700 mr-2" />
              <h3 className="text-xl font-medium text-gray-800">Demande publique</h3>
            </div>
            
            <form onSubmit={handleSubmit}>
              <p className="text-gray-700 mb-2">Décrivez votre besoin</p>
              <textarea 
                placeholder="Bonjour," 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 mb-4"
              ></textarea>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-1">Ajoutez des photos</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Augmentez vos chances de faire affaire de 25% en illustrant votre besoin.
                </p>
                
                <input 
                  type="file" 
                  multiple 
                  onChange={handleImageUpload}
                  className="hidden" 
                  id="image-upload"
                  accept="image/*"
                />
                <label 
                  htmlFor="image-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-sm"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Sélectionner des photos
                </label>
                
                {images.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={URL.createObjectURL(img)} 
                          alt={`Preview ${index}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                        >
                          <XIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <button 
                type="submit"
                className={`w-full py-3 rounded-full transition-colors ${messageText.trim() || images.length > 0 ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                disabled={!messageText.trim() && images.length === 0}
              >
                Poster ma demande
              </button>
            </form>
          </div>
          
          {/* Additional Info Section */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Conseils pour votre demande</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Soyez précis dans votre description
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Ajoutez des photos de bonne qualité
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Mentionnez votre localisation
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Répondez rapidement aux commentaires
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomeClient;