"use client";
import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaUserCircle, FaTools, FaSearch, FaEllipsisV, FaFileImage, FaMicrophone } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { IoMdSend } from 'react-icons/io';
import { BsCheck2All } from 'react-icons/bs';

const ChatInterfacee = ({ userType = 'technician', userId = 'tech1' }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentChat, setCurrentChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);

  // Enhanced conversations with last seen and service details
  const conversations = [
    {
      id: 'conv1',
      technician: { 
        id: 'tech1', 
        name: 'Mohamed K.', 
        specialty: 'Plomberie',
        rating: 4.7,
        online: true,
        lastSeen: '2023-06-15T14:30:00'
      },
      client: { 
        id: 'client1', 
        name: 'Ali B.', 
        address: '12 Rue Didouche Mourad, Alger',
        online: false,
        lastSeen: '2023-06-15T10:45:00'
      },
      service: {
        title: 'Réparation climatiseur',
        type: 'Urgent',
        date: '2023-06-16',
        price: '3500 DA'
      },
      lastMessage: '2023-06-15T14:30:00',
      unread: 2
    },
    {
      id: 'conv2',
      technician: { 
        id: 'tech2', 
        name: 'Samir D.', 
        specialty: 'Électricité',
        rating: 4.9,
        online: false,
        lastSeen: '2023-06-14T18:20:00'
      },
      client: { 
        id: 'client2', 
        name: 'Fatima Z.', 
        address: '45 Rue Hassiba Ben Bouali, Alger',
        online: true,
        lastSeen: '2023-06-15T15:10:00'
      },
      service: {
        title: 'Installation électrique',
        type: 'Standard',
        date: '2023-06-17',
        price: '7500 DA'
      },
      lastMessage: '2023-06-14T10:15:00',
      unread: 0
    }
  ];

  // Enhanced messages with read status and multimedia support
  const allMessages = {
    conv1: [
      { 
        id: '1', 
        sender: 'client1', 
        text: 'Bonjour, mon climatiseur fait un bruit étrange quand je le mets en marche', 
        timestamp: '2023-06-15T10:30:00',
        read: true,
        type: 'text'
      },
      { 
        id: '2', 
        sender: 'tech1', 
        text: 'Je peux passer demain matin entre 9h et 11h pour diagnostiquer le problème', 
        timestamp: '2023-06-15T11:15:00',
        read: true,
        type: 'text'
      },
      { 
        id: '3', 
        sender: 'client1', 
        text: 'Parfait, 10h ça me convient. Voici une photo du modèle', 
        timestamp: '2023-06-15T14:30:00',
        read: false,
        type: 'media',
        mediaUrl: '/climatiseur.jpg',
        mediaType: 'image'
      }
    ],
    conv2: [
      { 
        id: '1', 
        sender: 'tech2', 
        text: "J'ai reçu les matériaux nécessaires pour votre installation électrique", 
        timestamp: '2023-06-14T09:00:00',
        read: true,
        type: 'text'
      },
      { 
        id: '2', 
        sender: 'client2', 
        text: 'Super, je vous attends demain matin vers 9h. Voici le plan du circuit', 
        timestamp: '2023-06-14T10:15:00',
        read: true,
        type: 'media',
        mediaUrl: '/plan-electrique.pdf',
        mediaType: 'document'
      }
    ]
  };

  useEffect(() => {
    if (currentChat) {
      setMessages(allMessages[currentChat] || []);
      // Mark messages as read when opening chat
      if (userType === 'technician') {
        const conv = conversations.find(c => c.id === currentChat);
        if (conv && conv.unread > 0) {
          conv.unread = 0;
        }
      }
    }
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    const message = {
      id: Date.now().toString(),
      sender: userId,
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'text'
    };

    // Update last message in conversation
    const conv = conversations.find(c => c.id === currentChat);
    if (conv) {
      conv.lastMessage = message.timestamp;
      if (userType === 'technician') {
        conv.unread += 1;
      }
    }

    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate response for demo
      if (Math.random() > 0.5) {
        const reply = {
          id: Date.now().toString() + 'r',
          sender: currentChat.includes('conv1') ? 'client1' : 'client2',
          text: getRandomResponse(),
          timestamp: new Date().toISOString(),
          read: false,
          type: 'text'
        };
        setMessages(prev => [...prev, reply]);
      }
    }, 2000);
  };

  const getRandomResponse = () => {
    const responses = [
      "D'accord, merci!",
      "Je vous attends alors",
      "Parfait, c'est noté",
      "Merci pour l'information",
      "Je confirme ma disponibilité"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleAttachment = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
    // In a real app, you would upload files and get URLs
    files.forEach(file => {
      const message = {
        id: Date.now().toString(),
        sender: userId,
        text: file.name,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'media',
        mediaUrl: URL.createObjectURL(file),
        mediaType: file.type.split('/')[0] === 'image' ? 'image' : 'document'
      };
      setMessages(prev => [...prev, message]);
    });
  };

  const getParticipant = (conversation) => {
    return userType === 'technician' ? conversation.client : conversation.technician;
  };

  const getAvatar = (user, isOnline = false) => {
    const isTech = user.id.includes('tech');
    return (
      <div className="relative">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isTech ? 'bg-indigo-100 text-indigo-600' : 'bg-teal-100 text-teal-600'
        }`}>
          {isTech ? <FaTools size={18} /> : <FaUserCircle size={20} />}
        </div>
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>
    );
  };

  const renderMessageContent = (msg) => {
    if (msg.type === 'media') {
      if (msg.mediaType === 'image') {
        return (
          <div className="mt-1">
            <img 
              src={msg.mediaUrl} 
              alt="Media" 
              className="max-w-xs rounded-lg border border-gray-200"
            />
            {msg.text && <p className="mt-1">{msg.text}</p>}
          </div>
        );
      } else {
        return (
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <div className="bg-indigo-100 p-2 rounded mr-2">
              <FaFileImage className="text-indigo-600" />
            </div>
            <div>
              <p className="font-medium text-sm">{msg.text}</p>
              <p className="text-xs text-gray-500">Document</p>
            </div>
          </div>
        );
      }
    }
    return <p>{msg.text}</p>;
  };

  const filteredConversations = conversations.filter(conv => {
    const participant = getParticipant(conv);
    return (
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* Conversations sidebar */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          <div className="relative mt-3">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une conversation..."
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
              className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
                currentChat === conv.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  {getAvatar(
                    getParticipant(conv),
                    getParticipant(conv).online
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-gray-900 truncate">
                        {getParticipant(conv).name}
                      </h3>
                      <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                        {format(parseISO(conv.lastMessage), 'HH:mm', { locale: fr })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {conv.service.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {allMessages[conv.id]?.[allMessages[conv.id].length - 1]?.text}
                    </p>
                  </div>
                </div>
                {conv.unread > 0 && (
                  <span className="bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {currentChat ? (
          <>
            {/* Chat header */}
            <div className="p-3 border-b border-gray-200 bg-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {getAvatar(
                  getParticipant(conversations.find(c => c.id === currentChat)),
                  getParticipant(conversations.find(c => c.id === currentChat)).online
                )}
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">
                      {getParticipant(conversations.find(c => c.id === currentChat)).name}
                    </h3>
                    {getParticipant(conversations.find(c => c.id === currentChat)).online ? (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        En ligne
                      </span>
                    ) : (
                      <span className="ml-2 text-xs text-gray-500">
                        Vu à {format(parseISO(getParticipant(conversations.find(c => c.id === currentChat)).lastSeen), 'HH:mm', { locale: fr })}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {conversations.find(c => c.id === currentChat)?.service.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
                  <FaEllipsisV />
                </button>
              </div>
            </div>

            {/* Service details */}
            <div className="bg-indigo-50 p-3 border-b border-indigo-100">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-green-800">
                    Détails de l'intervention
                  </h4>
                  <p className="text-xs text-green-600">
                    {conversations.find(c => c.id === currentChat)?.service.type} • {conversations.find(c => c.id === currentChat)?.service.date}
                  </p>
                </div>
                <span className="bg-white text-green-600 text-sm font-medium px-2 py-1 rounded">
                  {conversations.find(c => c.id === currentChat)?.service.price}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === userId ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg transition-all ${
                      msg.sender === userId
                        ? 'bg-green-500 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 rounded-bl-none'
                    } shadow-sm`}
                  >
                    {msg.sender !== userId && (
                      <div className="flex items-center mb-1">
                        <span className="mr-2">
                          {getAvatar(
                            msg.sender.includes('tech') 
                              ? { id: msg.sender, name: 'Technicien' } 
                              : { id: msg.sender, name: 'Client' },
                            false
                          )}
                        </span>
                        <span className="text-xs opacity-80">
                          {msg.sender.includes('tech') 
                            ? conversations.find(c => c.id === currentChat)?.technician.name
                            : conversations.find(c => c.id === currentChat)?.client.name}
                        </span>
                      </div>
                    )}
                    {renderMessageContent(msg)}
                    <div className="flex justify-end items-center mt-1 space-x-1">
                      <span className={`text-xs ${
                        msg.sender === userId ? 'text-indigo-100' : 'text-gray-500'
                      }`}>
                        {format(parseISO(msg.timestamp), 'HH:mm', { locale: fr })}
                      </span>
                      {msg.sender === userId && (
                        <BsCheck2All className={`text-xs ${
                          msg.read ? 'text-blue-300' : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-2 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <label className="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                  <FaFileImage className="text-lg" />
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleAttachment}
                    accept="image/*, .pdf, .doc, .docx"
                    multiple
                  />
                </label>
                <label className="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                  <FaMicrophone className="text-lg" />
                  <input type="file" className="hidden" accept="audio/*" />
                </label>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-full ${
                    newMessage.trim() 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <IoMdSend className="text-lg" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FaPaperPlane className="text-green-500 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {userType === 'technician' ? 'Discutez avec vos clients' : 'Discutez avec votre technicien'}
            </h3>
            <p className="text-center max-w-md">
              Sélectionnez une conversation existante ou démarrez une nouvelle discussion pour poser vos questions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterfacee;