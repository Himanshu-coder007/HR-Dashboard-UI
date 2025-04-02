import { FiSearch, FiFilter, FiUser, FiMail, FiPhone, FiClock, FiCheck, FiX, FiMoreHorizontal, FiCalendar, FiDownload } from 'react-icons/fi';
import { useState } from 'react';

const ApplicantTracking = () => {
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      position: 'Frontend Developer',
      status: 'Applied',
      appliedDate: '2023-05-20',
      resume: 'john_doe_resume.pdf',
      notes: 'Strong React experience',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '(987) 654-3210',
      position: 'Product Manager',
      status: 'Shortlisted',
      appliedDate: '2023-05-18',
      resume: 'jane_smith_resume.pdf',
      notes: 'Previous experience at tech startup',
    },
    {
      id: 3,
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      phone: '(555) 123-4567',
      position: 'UX Designer',
      status: 'Interview Scheduled',
      appliedDate: '2023-05-15',
      resume: 'alex_j_resume.pdf',
      notes: 'Impressive portfolio',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: '(222) 333-4444',
      position: 'Frontend Developer',
      status: 'Hired',
      appliedDate: '2023-05-10',
      resume: 'sarah_w_resume.pdf',
      notes: 'Excellent cultural fit',
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '(777) 888-9999',
      position: 'Product Manager',
      status: 'Rejected',
      appliedDate: '2023-05-05',
      resume: 'michael_b_resume.pdf',
      notes: 'Lacked relevant experience',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [positionFilter, setPositionFilter] = useState('All');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  const statusOptions = ['All', 'Applied', 'Shortlisted', 'Interview Scheduled', 'Hired', 'Rejected'];
  const positionOptions = ['All', 'Frontend Developer', 'Product Manager', 'UX Designer'];

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || applicant.status === statusFilter;
    const matchesPosition = positionFilter === 'All' || applicant.position === positionFilter;
    
    return matchesSearch && matchesStatus && matchesPosition;
  });

  const updateApplicantStatus = (id, newStatus) => {
    setApplicants(applicants.map(applicant => 
      applicant.id === id ? { ...applicant, status: newStatus } : applicant
    ));
  };

  const addNote = () => {
    if (selectedApplicant && newNote.trim()) {
      setApplicants(applicants.map(applicant => 
        applicant.id === selectedApplicant.id 
          ? { ...applicant, notes: applicant.notes ? `${applicant.notes}\n${newNote}` : newNote }
          : applicant
      ));
      setNewNote('');
      setIsNotesModalOpen(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applied':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800"><FiClock className="mr-1" /> Applied</span>;
      case 'Shortlisted':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800"><FiUser className="mr-1" /> Shortlisted</span>;
      case 'Interview Scheduled':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800"><FiCalendar className="mr-1" /> Interview</span>;
      case 'Hired':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800"><FiCheck className="mr-1" /> Hired</span>;
      case 'Rejected':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800"><FiX className="mr-1" /> Rejected</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-indigo-900 mb-2">Applicant Tracking System</h2>
          <p className="text-indigo-600">Manage all your job applications in one place</p>
        </div>
        
        {/* Filters */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-indigo-700 mb-1">Search Applicants</label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-indigo-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-indigo-100 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search by name, email or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-indigo-700 mb-1">Status</label>
              <select
                id="status"
                className="block w-full pl-3 pr-10 py-2 border border-indigo-100 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-indigo-700 mb-1">Position</label>
              <select
                id="position"
                className="block w-full pl-3 pr-10 py-2 border border-indigo-100 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
              >
                {positionOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-blue-500">
            <div className="text-sm font-medium text-gray-500">Total</div>
            <div className="text-2xl font-bold text-blue-600">{applicants.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-purple-500">
            <div className="text-sm font-medium text-gray-500">Shortlisted</div>
            <div className="text-2xl font-bold text-purple-600">{applicants.filter(a => a.status === 'Shortlisted').length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-amber-500">
            <div className="text-sm font-medium text-gray-500">Interview</div>
            <div className="text-2xl font-bold text-amber-600">{applicants.filter(a => a.status === 'Interview Scheduled').length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-green-500">
            <div className="text-sm font-medium text-gray-500">Hired</div>
            <div className="text-2xl font-bold text-green-600">{applicants.filter(a => a.status === 'Hired').length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-rose-500">
            <div className="text-sm font-medium text-gray-500">Rejected</div>
            <div className="text-2xl font-bold text-rose-600">{applicants.filter(a => a.status === 'Rejected').length}</div>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredApplicants.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto h-24 w-24 text-indigo-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No applicants found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Candidate</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Position</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Applied</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Notes</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-indigo-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FiUser className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-indigo-900">{applicant.name}</div>
                          <div className="text-sm text-indigo-600">{applicant.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 font-medium">
                        {applicant.position}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-700">
                        <FiMail className="mr-2 text-indigo-400" />
                        {applicant.email}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-700">
                        <FiPhone className="mr-2 text-indigo-400" />
                        {applicant.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(applicant.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-indigo-400" />
                        {applicant.appliedDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                      <div className="line-clamp-2">
                        {applicant.notes || 'No notes'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <select
                          value={applicant.status}
                          onChange={(e) => updateApplicantStatus(applicant.id, e.target.value)}
                          className="block w-full pl-2 pr-8 py-1 text-sm border border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          {statusOptions.filter(opt => opt !== 'All').map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            setSelectedApplicant(applicant);
                            setIsNotesModalOpen(true);
                          }}
                          className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 rounded-lg transition-colors"
                          title="View/Add Notes"
                        >
                          <FiMoreHorizontal />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Notes Modal */}
        {isNotesModalOpen && selectedApplicant && (
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
                      <h3 className="text-xl leading-6 font-bold text-indigo-900 mb-2">
                        {selectedApplicant.name} - {selectedApplicant.position}
                      </h3>
                      <div className="flex items-center mb-4">
                        {getStatusBadge(selectedApplicant.status)}
                        <span className="ml-3 text-sm text-gray-500">
                          Applied on {selectedApplicant.appliedDate}
                        </span>
                      </div>
                      
                      <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-medium text-indigo-700 mb-2">Current Notes</h4>
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                          {selectedApplicant.notes || 'No notes yet'}
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="newNote" className="block text-sm font-medium text-indigo-700 mb-1">
                          Add New Note
                        </label>
                        <textarea
                          id="newNote"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-indigo-100 rounded-lg p-2"
                          placeholder="Enter your notes here..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <a 
                          href={`#download-${selectedApplicant.resume}`} 
                          className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                        >
                          <FiDownload className="mr-1" />
                          Download Resume
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={addNote}
                    disabled={!newNote.trim()}
                    className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-base font-medium text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm ${!newNote.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Add Note
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsNotesModalOpen(false);
                      setNewNote('');
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
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

export default ApplicantTracking;