import { FiPaperclip } from 'react-icons/fi';
import { useState } from 'react';

const AttachmentsSection = ({ 
  attachments, 
  onFileUpload 
}) => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    onFileUpload(file);
    setFile(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Attachments</h2>
      
      {attachments.length > 0 ? (
        <div className="space-y-3">
          {attachments.map(file => (
            <div key={file.id} className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
              <FiPaperclip className="mr-3 text-gray-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{file.uploadDate}</p>
              </div>
              <a 
                href={file.url} 
                download
                className="text-blue-600 text-sm hover:underline"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No attachments yet</p>
      )}
      
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
        <div className="flex">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="flex-1 border rounded-l-lg px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded-r-lg hover:bg-blue-700 transition"
          >
            <FiPaperclip />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttachmentsSection;