import { FiSearch, FiFilter, FiUser, FiMail, FiPhone, FiClock, FiCheck, FiX, FiMoreHorizontal, FiCalendar } from 'react-icons/fi';
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
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><FiClock className="mr-1" /> Applied</span>;
      case 'Shortlisted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><FiUser className="mr-1" /> Shortlisted</span>;
      case 'Interview Scheduled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><FiCalendar className="mr-1" /> Interview</span>;
      case 'Hired':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><FiCheck className="mr-1" /> Hired</span>;
      case 'Rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><FiX className="mr-1" /> Rejected</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Applicant Tracking System</h2>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="relative rounded-md shadow-sm w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
              placeholder="Search applicants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplicants.map((applicant) => (
              <tr key={applicant.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FiUser className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                      <div className="text-sm text-gray-500">{applicant.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiMail className="mr-2 text-gray-400" />
                    {applicant.email}
                  </div>
                  <div className="flex items-center mt-1">
                    <FiPhone className="mr-2 text-gray-400" />
                    {applicant.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(applicant.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.appliedDate}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {applicant.notes || 'No notes'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <select
                      value={applicant.status}
                      onChange={(e) => updateApplicantStatus(applicant.id, e.target.value)}
                      className="block w-full pl-2 pr-8 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <FiMoreHorizontal />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes Modal */}
      {isNotesModalOpen && selectedApplicant && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Notes for {selectedApplicant.name}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2 whitespace-pre-line">
                      {selectedApplicant.notes || 'No notes yet'}
                    </p>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Add a new note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={addNote}
                  disabled={!newNote.trim()}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!newNote.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Add Note
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsNotesModalOpen(false);
                    setNewNote('');
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantTracking;