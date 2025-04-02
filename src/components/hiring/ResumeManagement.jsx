import { FiFile, FiDownload, FiTrash2, FiSearch, FiUser, FiMail, FiPhone, FiPlus } from 'react-icons/fi';
import { useState } from 'react';

const ResumeManagement = () => {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      position: 'Frontend Developer',
      fileName: 'john_doe_resume.pdf',
      fileSize: '2.4 MB',
      uploadDate: '2023-05-20',
      notes: 'Strong React experience',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '(987) 654-3210',
      position: 'Product Manager',
      fileName: 'jane_smith_resume.pdf',
      fileSize: '1.8 MB',
      uploadDate: '2023-05-18',
      notes: 'Previous experience at tech startup',
    },
    {
      id: 3,
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      phone: '(555) 123-4567',
      position: 'UX Designer',
      fileName: 'alex_j_resume.pdf',
      fileSize: '3.2 MB',
      uploadDate: '2023-05-15',
      notes: 'Impressive portfolio',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResume, setSelectedResume] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newResume, setNewResume] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    file: null
  });

  const filteredResumes = resumes.filter(resume => 
    resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteResume = () => {
    if (selectedResume) {
      setResumes(resumes.filter(resume => resume.id !== selectedResume.id));
      setIsDeleteModalOpen(false);
      setSelectedResume(null);
    }
  };

  const addNote = () => {
    if (selectedResume && newNote.trim()) {
      setResumes(resumes.map(resume => 
        resume.id === selectedResume.id 
          ? { ...resume, notes: resume.notes ? `${resume.notes}\n${newNote}` : newNote }
          : resume
      ));
      setNewNote('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewResume({
        ...newResume,
        file,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  const uploadResume = () => {
    if (newResume.name && newResume.email && newResume.file) {
      const newId = Math.max(...resumes.map(r => r.id), 0) + 1;
      const uploadedResume = {
        id: newId,
        name: newResume.name,
        email: newResume.email,
        phone: newResume.phone,
        position: newResume.position,
        fileName: newResume.fileName,
        fileSize: newResume.fileSize,
        uploadDate: new Date().toISOString().split('T')[0],
        notes: ''
      };
      
      setResumes([...resumes, uploadedResume]);
      setIsUploadModalOpen(false);
      setNewResume({
        name: '',
        email: '',
        phone: '',
        position: '',
        file: null
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Resume Management</h1>
            <p className="text-indigo-600">Track and manage all candidate resumes in one place</p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="mr-2" /> Upload Resume
          </button>
        </div>

        {/* Search */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-md p-6 mb-8">
          <div className="relative rounded-lg shadow-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-indigo-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-indigo-100 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by name, position or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-indigo-500">
            <h3 className="text-sm font-medium text-gray-500">Total Resumes</h3>
            <p className="text-3xl font-bold text-indigo-600">{resumes.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500">Frontend Devs</h3>
            <p className="text-3xl font-bold text-blue-600">{resumes.filter(r => r.position.includes('Frontend')).length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-purple-500">
            <h3 className="text-sm font-medium text-gray-500">Product Mgrs</h3>
            <p className="text-3xl font-bold text-purple-600">{resumes.filter(r => r.position.includes('Product')).length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-amber-500">
            <h3 className="text-sm font-medium text-gray-500">UX Designers</h3>
            <p className="text-3xl font-bold text-amber-600">{resumes.filter(r => r.position.includes('UX')).length}</p>
          </div>
        </div>

        {/* Resumes List */}
        <div className="space-y-6">
          {filteredResumes.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="mx-auto h-24 w-24 text-indigo-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No resumes found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or upload a new resume</p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiPlus className="mr-2" /> Upload Resume
              </button>
            </div>
          ) : (
            filteredResumes.map((resume) => (
              <div key={resume.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FiUser className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-indigo-900">{resume.name}</h3>
                      <p className="text-indigo-600 font-medium">{resume.position}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 w-full md:w-auto">
                    <button
                      onClick={() => alert(`Downloading ${resume.fileName}`)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiDownload className="mr-2" /> Download
                    </button>
                    <button
                      onClick={() => {
                        setSelectedResume(resume);
                        setIsDeleteModalOpen(true);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FiTrash2 className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-2">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <FiMail className="mr-2 text-indigo-400" />
                          {resume.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <FiPhone className="mr-2 text-indigo-400" />
                          {resume.phone}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-2">Resume Details</h4>
                      <div className="flex items-center text-sm text-gray-700 mb-1">
                        <FiFile className="mr-2 text-indigo-400" />
                        <span className="font-medium">{resume.fileName}</span>
                        <span className="text-gray-500 ml-2">({resume.fileSize})</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Uploaded on {resume.uploadDate}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-4 bg-indigo-50">
                  <h4 className="text-sm font-medium text-indigo-700 mb-2">Notes</h4>
                  <div className="whitespace-pre-line text-sm text-gray-700 mb-3">
                    {resume.notes || 'No notes yet'}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-lg border border-indigo-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Add a note..."
                      value={selectedResume?.id === resume.id ? newNote : ''}
                      onChange={(e) => {
                        setSelectedResume(resume);
                        setNewNote(e.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        setSelectedResume(resume);
                        addNote();
                      }}
                      disabled={!newNote.trim() || selectedResume?.id !== resume.id}
                      className={`ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(!newNote.trim() || selectedResume?.id !== resume.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedResume && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-6 pt-5 pb-4 sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FiTrash2 className="h-6 w-6 text-rose-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-bold text-gray-900">Delete Resume</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete the resume for <span className="font-medium">{selectedResume.name}</span>? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={deleteResume}
                    className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Resume Modal */}
        {isUploadModalOpen && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-6 pt-5 pb-4 sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-2xl leading-6 font-bold text-indigo-900 mb-4">Upload New Resume</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-indigo-700 mb-1">Candidate Name*</label>
                          <input
                            type="text"
                            id="name"
                            className="block w-full px-3 py-2 border border-indigo-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={newResume.name}
                            onChange={(e) => setNewResume({...newResume, name: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-indigo-700 mb-1">Email*</label>
                            <input
                              type="email"
                              id="email"
                              className="block w-full px-3 py-2 border border-indigo-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              value={newResume.email}
                              onChange={(e) => setNewResume({...newResume, email: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-indigo-700 mb-1">Phone</label>
                            <input
                              type="tel"
                              id="phone"
                              className="block w-full px-3 py-2 border border-indigo-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              value={newResume.phone}
                              onChange={(e) => setNewResume({...newResume, phone: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="position" className="block text-sm font-medium text-indigo-700 mb-1">Position*</label>
                          <input
                            type="text"
                            id="position"
                            className="block w-full px-3 py-2 border border-indigo-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={newResume.position}
                            onChange={(e) => setNewResume({...newResume, position: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="resume" className="block text-sm font-medium text-indigo-700 mb-1">Resume File*</label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-indigo-100 border-dashed rounded-lg">
                            <div className="space-y-1 text-center">
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleFileUpload}
                                    accept=".pdf,.doc,.docx"
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PDF, DOC, DOCX up to 10MB
                              </p>
                              {newResume.fileName && (
                                <p className="text-sm text-indigo-600 font-medium mt-2">
                                  <FiFile className="inline mr-1" />
                                  {newResume.fileName} ({newResume.fileSize})
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={uploadResume}
                    disabled={!newResume.name || !newResume.email || !newResume.position || !newResume.file}
                    className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-base font-medium text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm ${(!newResume.name || !newResume.email || !newResume.position || !newResume.file) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Upload Resume
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeManagement;