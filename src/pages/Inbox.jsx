import React, { useState } from 'react';
import { 
  FiInbox, 
  FiStar, 
  FiSend, 
  FiTrash2, 
  FiFile, 
  FiAlertCircle, 
  FiArchive, 
  FiSearch,
  FiChevronDown,
  FiPaperclip,  // Added this import
  FiRefreshCw,
  FiMail,
  FiCircle,
  FiX
} from 'react-icons/fi';
import Compose from '../components/Compose';

const Inbox = () => {
  // Sample message data
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'john.doe@company.com',
      subject: 'Weekly Team Meeting',
      body: 'Hi team, just a reminder about our weekly meeting tomorrow at 10 AM. Please prepare your updates.',
      date: '2023-06-15 09:30',
      read: false,
      starred: true,
      category: 'HR',
      attachments: ['meeting_agenda.pdf']
    },
    {
      id: 2,
      from: 'finance@company.com',
      subject: 'Your Expense Report',
      body: 'Your recent expense report has been approved. The amount will be credited to your account within 3 business days.',
      date: '2023-06-14 14:15',
      read: true,
      starred: false,
      category: 'Finance',
      attachments: []
    },
    {
      id: 3,
      from: 'system@company.com',
      subject: 'Password Reset Required',
      body: 'For security reasons, please reset your password within the next 7 days.',
      date: '2023-06-13 11:45',
      read: false,
      starred: false,
      category: 'System',
      attachments: []
    },
    {
      id: 4,
      from: 'jane.smith@company.com',
      subject: 'Project Deadline Update',
      body: 'The deadline for the current project has been extended by one week. Please adjust your schedules accordingly.',
      date: '2023-06-12 16:20',
      read: true,
      starred: true,
      category: 'Projects',
      attachments: ['updated_timeline.docx']
    },
    {
      id: 5,
      from: 'support@company.com',
      subject: 'Your Support Ticket #45678',
      body: 'We have received your support request and will get back to you within 24 hours.',
      date: '2023-06-11 10:05',
      read: true,
      starred: false,
      category: 'Support',
      attachments: []
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);

  // Filter messages based on category and search term
  const filteredMessages = messages.filter(message => {
    // Category filter
    if (currentCategory === 'inbox') {
      // No additional filtering for inbox
    } else if (currentCategory === 'unread') {
      if (message.read) return false;
    } else if (currentCategory === 'starred') {
      if (!message.starred) return false;
    } else if (currentCategory === 'important') {
      if (message.category !== 'HR' && message.category !== 'Finance') return false;
    } else {
      if (message.category !== currentCategory) return false;
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        message.from.toLowerCase().includes(term) ||
        message.subject.toLowerCase().includes(term) ||
        message.body.toLowerCase().includes(term)
      );
    }

    return true;
  });

  // Count unread messages
  const unreadCount = messages.filter(message => !message.read).length;

  // Message actions
  const markAsRead = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    ));
  };

  const toggleStar = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, starred: !message.starred } : message
    ));
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(message => message.id !== id));
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
  };

  const archiveMessage = (id) => {
    setMessages(messages.filter(message => message.id !== id));
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleSendEmail = (emailData) => {
    // Create a new sent message
    const newMessage = {
      id: messages.length + 1,
      from: 'me@mycompany.com',
      to: emailData.to,
      subject: emailData.subject,
      body: emailData.body,
      date: new Date().toISOString().split('T')[0] + ' ' + 
            new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      read: true,
      starred: false,
      category: 'sent',
      attachments: []
    };
    
    // Add to messages
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <button 
          onClick={() => setComposeOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mb-6 flex items-center justify-center"
        >
          <FiMail className="mr-2" />
          Compose
        </button>

        <ul className="space-y-1">
          <li>
            <button 
              onClick={() => setCurrentCategory('inbox')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${currentCategory === 'inbox' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <div className="flex items-center">
                <FiInbox className="mr-3" />
                <span>Inbox</span>
              </div>
              {unreadCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentCategory('starred')}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${currentCategory === 'starred' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <FiStar className="mr-3" />
              <span>Starred</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentCategory('important')}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${currentCategory === 'important' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <FiAlertCircle className="mr-3" />
              <span>Important</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentCategory('unread')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${currentCategory === 'unread' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <div className="flex items-center">
                <FiCircle className="mr-3" />
                <span>Unread</span>
              </div>
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentCategory('sent')}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${currentCategory === 'sent' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <FiSend className="mr-3" />
              <span>Sent</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentCategory('trash')}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${currentCategory === 'trash' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <FiTrash2 className="mr-3" />
              <span>Trash</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentCategory('archive')}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${currentCategory === 'archive' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <FiArchive className="mr-3" />
              <span>Archive</span>
            </button>
          </li>
        </ul>

        <div className="mt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
            Categories
          </h3>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setCurrentCategory('HR')}
                className={`w-full flex items-center px-3 py-2 rounded-lg ${currentCategory === 'HR' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                <span>HR</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentCategory('Finance')}
                className={`w-full flex items-center px-3 py-2 rounded-lg ${currentCategory === 'Finance' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                <span>Finance</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentCategory('Projects')}
                className={`w-full flex items-center px-3 py-2 rounded-lg ${currentCategory === 'Projects' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                <span>Projects</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentCategory('Support')}
                className={`w-full flex items-center px-3 py-2 rounded-lg ${currentCategory === 'Support' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                <span>Support</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="ml-4 p-2 rounded-lg hover:bg-gray-100">
              <FiRefreshCw />
            </button>
          </div>
        </div>

        {/* Message List and View Panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* Message List */}
          <div className={`${selectedMessage ? 'w-2/5' : 'w-full'} border-r border-gray-200 bg-white overflow-y-auto`}>
            {filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FiInbox size={48} className="mb-4" />
                <p>No messages found</p>
              </div>
            ) : (
              <ul>
                {filteredMessages.map(message => (
                  <li 
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (!message.read) markAsRead(message.id);
                    }}
                    className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${!message.read ? 'bg-blue-50' : ''} ${selectedMessage?.id === message.id ? 'bg-gray-100' : ''}`}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(message.id);
                            }}
                            className={`mr-2 ${message.starred ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
                          >
                            <FiStar />
                          </button>
                          <span className="font-medium">{message.from.split('@')[0]}</span>
                        </div>
                        <span className="text-xs text-gray-500">{message.date.split(' ')[0]}</span>
                      </div>
                      <h3 className="font-medium text-gray-800">{message.subject}</h3>
                      <p className="text-sm text-gray-600 truncate">{message.body}</p>
                      {message.attachments.length > 0 && (
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <FiPaperclip className="mr-1" />
                          <span>{message.attachments.length} attachment{message.attachments.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Message View Panel */}
          {selectedMessage && (
            <div className="flex-1 overflow-y-auto bg-white p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedMessage.subject}</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => archiveMessage(selectedMessage.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                    title="Archive"
                  >
                    <FiArchive />
                  </button>
                  <button 
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                    {selectedMessage.from.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{selectedMessage.from}</div>
                    <div className="text-sm text-gray-500">to me</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{selectedMessage.date}</div>
              </div>

              <div className="prose max-w-none mb-8">
                <p>{selectedMessage.body}</p>
              </div>

              {selectedMessage.attachments.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Attachments ({selectedMessage.attachments.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedMessage.attachments.map((file, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                        <div className="flex items-center">
                          <FiFile className="text-gray-500 mr-3" />
                          <div>
                            <div className="font-medium text-gray-800">{file}</div>
                            <div className="text-xs text-gray-500">PDF • 245 KB</div>
                          </div>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <button className="text-xs text-blue-600 hover:text-blue-800">
                            View
                          </button>
                          <button className="text-xs text-blue-600 hover:text-blue-800">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Reply
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Forward
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Popup */}
      {composeOpen && (
        <Compose 
          onClose={() => setComposeOpen(false)} 
          onSubmit={handleSendEmail}
        />
      )}
    </div>
  );
};

export default Inbox;