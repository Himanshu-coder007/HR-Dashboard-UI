import React from 'react';
import { FiPaperclip, FiChevronDown, FiX } from 'react-icons/fi';

const Compose = ({ onClose, onSubmit }) => {
  const [emailData, setEmailData] = React.useState({
    to: '',
    subject: '',
    body: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(emailData);
    onClose();
  };

  return (
    <div className="fixed bottom-0 right-0 w-full max-w-xl bg-white shadow-xl rounded-t-lg border border-gray-300 z-10">
      <div className="flex items-center justify-between bg-gray-800 text-white p-3 rounded-t-lg">
        <h3 className="font-medium">New Message</h3>
        <div className="flex space-x-2">
          <button className="hover:bg-gray-700 p-1 rounded">
            <FiChevronDown />
          </button>
          <button 
            onClick={onClose}
            className="hover:bg-gray-700 p-1 rounded"
          >
            <FiX />
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <input 
            type="email" 
            name="to"
            placeholder="To" 
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            value={emailData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input 
            type="text" 
            name="subject"
            placeholder="Subject" 
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            value={emailData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <textarea 
            name="body"
            placeholder="Compose email..." 
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 min-h-[200px]"
            value={emailData.body}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button 
              type="button"
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            >
              <FiPaperclip />
            </button>
          </div>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Compose;