import { FiFile, FiDownload, FiTrash2, FiSearch, FiUser, FiMail, FiPhone } from 'react-icons/fi';
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
  const [newNote, setNewNote] = useState('');

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

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume & Application Management</h2>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="relative rounded-md shadow-sm w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
              placeholder="Search resumes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredResumes.map((resume) => (
          <div key={resume.id} className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{resume.name}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{resume.position}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    // In a real app, this would download the file
                    alert(`Downloading ${resume.fileName}`);
                  }}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiDownload className="mr-2" /> Download
                </button>
                <button
                  onClick={() => {
                    setSelectedResume(resume);
                    setIsDeleteModalOpen(true);
                  }}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiTrash2 className="mr-2" /> Delete
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Contact information</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <FiMail className="mr-2 text-gray-400" />
                      {resume.email}
                    </div>
                    <div className="flex items-center mt-2">
                      <FiPhone className="mr-2 text-gray-400" />
                      {resume.phone}
                    </div>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Resume</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <FiFile className="mr-2 text-gray-400" />
                      <span className="font-medium">{resume.fileName}</span>
                      <span className="text-gray-500 ml-2">({resume.fileSize})</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Uploaded on {resume.uploadDate}
                    </div>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="whitespace-pre-line mb-2">{resume.notes || 'No notes yet'}</div>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                        className={`ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(!newNote.trim() || selectedResume?.id !== resume.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Add
                      </button>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedResume && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <FiTrash2 className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Resume</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the resume for "{selectedResume.name}"? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={deleteResume}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeManagement;