import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaUserCircle, FaTools } from 'react-icons/fa';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';

const ChatInterface = ({ userType, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentChat, setCurrentChat] = useState(null);
  const messagesEndRef = useRef(null);

  // Simuler des conversations (remplacer par Firebase/API réelle)
  const conversations = [
    {
      id: 'conv1',
      technician: { id: 'tech1', name: 'Mohamed K.' },
      client: { id: 'client1', name: 'Ali B.' },
      service: 'Réparation climatiseur',
      lastMessage: '2023-06-15T14:30:00'
    },
    {
      id: 'conv2',
      technician: { id: 'tech2', name: 'Samir D.' },
      client: { id: 'client2', name: 'Fatima Z.' },
      service: 'Installation électrique',
      lastMessage: '2023-06-14T10:15:00'
    }
  ];

  // Simuler des messages (remplacer par Firebase/API réelle)
  const allMessages = {
    conv1: [
      { id: '1', sender: 'client1', text: 'Bonjour, mon climatiseur fait du bruit', timestamp: '2023-06-15T10:30:00' },
      { id: '2', sender: 'tech1', text: 'Je peux passer demain matin', timestamp: '2023-06-15T11:15:00' },
      { id: '3', sender: 'client1', text: 'Parfait, vers 10h ça vous va ?', timestamp: '2023-06-15T14:30:00' }
    ],
    conv2: [
      { id: '1', sender: 'tech2', text: 'J\'ai les matériaux nécessaires', timestamp: '2023-06-14T09:00:00' },
      { id: '2', sender: 'client2', text: 'Super, je vous attends demain', timestamp: '2023-06-14T10:15:00' }
    ]
  };

  // Charger les conversations
  useEffect(() => {
    // Ici vous feriez un appel API pour charger les conversations
    // Exemple avec Firebase :
    // const unsubscribe = db.collection('conversations')
    //   .where('participants', 'array-contains', userId)
    //   .onSnapshot(snapshot => {...});
    
    return () => {
      // Nettoyage (unsubscribe Firebase si utilisé)
    };
  }, [userId]);

  // Charger les messages quand une conversation est sélectionnée
  useEffect(() => {
    if (currentChat) {
      // Simuler chargement messages
      setMessages(allMessages[currentChat] || []);
      
      // Avec Firebase :
      // const unsubscribe = db.collection('messages')
      //   .where('conversationId', '==', currentChat)
      //   .orderBy('timestamp', 'asc')
      //   .onSnapshot(snapshot => {...});
    }
  }, [currentChat]);

  // Faire défiler vers le bas automatiquement
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

    // Simuler envoi (remplacer par Firebase/API réelle)
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Avec Firebase :
    // db.collection('messages').add({
    //   conversationId: currentChat,
    //   sender: userId,
    //   text: newMessage,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
    // });
  };

  const getParticipantName = (conversation) => {
    return userType === 'technician' 
      ? conversation.client.name 
      : conversation.technician.name;
  };

  const getAvatar = (senderId) => {
    return senderId.includes('tech') 
      ? <FaTools className="text-blue-500" />
      : <FaUserCircle className="text-green-500" />;
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-gray-50">
      {/* Liste des conversations */}
      <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        
        {conversations.map(conv => (
          <div 
            key={conv.id}
            onClick={() => setCurrentChat(conv.id)}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
              currentChat === conv.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                {getAvatar(userType === 'technician' ? conv.client.id : conv.technician.id)}
                <div className="ml-3">
                  <h3 className="font-medium">{getParticipantName(conv)}</h3>
                  <p className="text-sm text-gray-500">{conv.service}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">
                {format(new Date(conv.lastMessage), 'HH:mm', { locale: fr })}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate mt-1">
              {allMessages[conv.id]?.[allMessages[conv.id].length - 1]?.text}
            </p>
          </div>
        ))}
      </div>

      {/* Zone de chat */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* En-tête du chat */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center">
              {getAvatar(
                userType === 'technician' 
                  ? conversations.find(c => c.id === currentChat)?.client.id 
                  : conversations.find(c => c.id === currentChat)?.technician.id
              )}
              <div className="ml-3">
                <h3 className="font-medium">
                  {userType === 'technician'
                    ? conversations.find(c => c.id === currentChat)?.client.name
                    : conversations.find(c => c.id === currentChat)?.technician.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {conversations.find(c => c.id === currentChat)?.service}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`mb-4 flex ${
                    msg.sender === userId ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === userId
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {msg.sender !== userId && (
                        <span className="mr-2">
                          {getAvatar(msg.sender)}
                        </span>
                      )}
                      <span className="text-xs opacity-80">
                        {format(new Date(msg.timestamp), 'HH:mm', { locale: fr })}
                      </span>
                    </div>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Formulaire d'envoi */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Sélectionnez une conversation pour commencer à discuter</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Exemple d'utilisation :
// <ChatInterface userType="client" userId="client1" />
// <ChatInterface userType="technician" userId="tech1" />

export default ChatInterface;