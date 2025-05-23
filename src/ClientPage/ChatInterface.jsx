import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaUserCircle, FaTools, FaSearch, FaEllipsisV } from 'react-icons/fa';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';

const ChatInterface = ({ userType, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentChat, setCurrentChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  // Simulated conversations
  const conversations = [
    {
      id: 'conv1',
      technician: { id: 'tech1', name: 'Mohamed K.', online: true },
      client: { id: 'client1', name: 'Ali B.', online: false },
      service: 'Réparation climatiseur',
      lastMessage: '2023-06-15T14:30:00',
      unread: userType === 'client' ? 2 : 0
    },
    {
      id: 'conv2',
      technician: { id: 'tech2', name: 'Samir D.', online: false },
      client: { id: 'client2', name: 'Fatima Z.', online: true },
      service: 'Installation électrique',
      lastMessage: '2023-06-14T10:15:00',
      unread: 0
    }
  ];

  // Simulated messages
  const allMessages = {
    conv1: [
      { id: '1', sender: 'client1', text: 'Bonjour, mon climatiseur fait du bruit', timestamp: '2023-06-15T10:30:00' },
      { id: '2', sender: 'tech1', text: 'Je peux passer demain matin pour diagnostiquer le problème', timestamp: '2023-06-15T11:15:00' },
      { id: '3', sender: 'client1', text: 'Parfait, vers 10h ça vous va ?', timestamp: '2023-06-15T14:30:00' }
    ],
    conv2: [
      { id: '1', sender: 'tech2', text: "J'ai les matériaux nécessaires pour votre installation", timestamp: '2023-06-14T09:00:00' },
      { id: '2', sender: 'client2', text: 'Super, je vous attends demain matin vers 9h', timestamp: '2023-06-14T10:15:00' }
    ]
  };

  useEffect(() => {
    if (currentChat) {
      setMessages(allMessages[currentChat] || []);
    }
  }, [currentChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    const message = {
      id: Date.now().toString(),
      sender: userId,
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getParticipantName = (conversation) => {
    return userType === 'technician' 
      ? conversation.client.name 
      : conversation.technician.name;
  };

  const getParticipantStatus = (conversation) => {
    return userType === 'technician'
      ? conversation.client.online
      : conversation.technician.online;
  };

  const getAvatar = (senderId, isOnline = false) => {
    const avatar = senderId.includes('tech') 
      ? <FaTools className="text-indigo-500 text-xl" />
      : <FaUserCircle className="text-teal-500 text-xl" />;
    
    return (
      <div className="relative">
        {avatar}
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>
    );
  };

  const filteredConversations = conversations.filter(conv => 
    getParticipantName(conv).toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* Conversations sidebar */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
          <div className="relative mt-3">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conv => (
            <div 
              key={conv.id}
              onClick={() => setCurrentChat(conv.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 ${
                currentChat === conv.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  {getAvatar(
                    userType === 'technician' ? conv.client.id : conv.technician.id,
                    getParticipantStatus(conv)
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{getParticipantName(conv)}</h3>
                    <p className="text-sm text-gray-500">{conv.service}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400">
                    {format(new Date(conv.lastMessage), 'HH:mm', { locale: fr })}
                  </span>
                  {conv.unread > 0 && (
                    <span className="mt-1 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 truncate mt-1 ml-9">
                {allMessages[conv.id]?.[allMessages[conv.id].length - 1]?.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {currentChat ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {getAvatar(
                  userType === 'technician' 
                    ? conversations.find(c => c.id === currentChat)?.client.id 
                    : conversations.find(c => c.id === currentChat)?.technician.id,
                  getParticipantStatus(conversations.find(c => c.id === currentChat))
                )}
                <div>
                  <h3 className="font-medium text-gray-900">
                    {userType === 'technician'
                      ? conversations.find(c => c.id === currentChat)?.client.name
                      : conversations.find(c => c.id === currentChat)?.technician.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {conversations.find(c => c.id === currentChat)?.service}
                  </p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
                <FaEllipsisV />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === userId ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl transition-all duration-200 ${
                      msg.sender === userId
                        ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 rounded-bl-none'
                    } shadow-sm`}
                  >
                    <div className="flex items-center mb-1">
                      {msg.sender !== userId && (
                        <span className="mr-2">
                          {getAvatar(msg.sender)}
                        </span>
                      )}
                      <span className={`text-xs ${
                        msg.sender === userId ? 'text-indigo-100' : 'text-gray-500'
                      }`}>
                        {format(new Date(msg.timestamp), 'HH:mm', { locale: fr })}
                      </span>
                    </div>
                    <p className={msg.sender === userId ? 'text-white' : 'text-gray-800'}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 disabled:bg-gray-400 transition-colors duration-200 shadow-md"
                >
                  <FaPaperPlane className="transform -rotate-45" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <FaPaperPlane className="text-indigo-500 text-3xl transform -rotate-45" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Sélectionnez une conversation</h3>
            <p className="text-center max-w-md">
              Choisissez une conversation existante ou commencez une nouvelle discussion avec un technicien.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;