import { FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';

const InterviewScheduling = () => {
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidate: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        position: 'Frontend Developer',
      },
      date: '2023-06-01',
      time: '14:00',
      duration: '60',
      interviewers: ['Jane Smith', 'Mike Johnson'],
      type: 'Technical',
      location: 'Zoom Meeting',
      status: 'Scheduled',
      notes: 'Focus on React and TypeScript skills',
    },
    {
      id: 2,
      candidate: {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '(987) 654-3210',
        position: 'Product Manager',
      },
      date: '2023-06-02',
      time: '10:30',
      duration: '45',
      interviewers: ['Mike Johnson', 'Sarah Williams'],
      type: 'Behavioral',
      location: 'Office - Room 201',
      status: 'Scheduled',
      notes: 'Discuss previous product launches',
    },
    {
      id: 3,
      candidate: {
        id: 3,
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        phone: '(555) 123-4567',
        position: 'UX Designer',
      },
      date: '2023-05-30',
      time: '16:00',
      duration: '90',
      interviewers: ['Sarah Williams'],
      type: 'Portfolio Review',
      location: 'Zoom Meeting',
      status: 'Completed',
      notes: 'Review design portfolio and process',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [interviewToDelete, setInterviewToDelete] = useState(null);

  const handleEdit = (interview) => {
    setCurrentInterview(interview);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (interview) => {
    setInterviewToDelete(interview);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    setInterviews(interviews.filter(interview => interview.id !== interviewToDelete.id));
    setIsDeleteConfirmOpen(false);
    setInterviewToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setCurrentInterview(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Scheduled':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800"><FiClock className="mr-1" /> Scheduled</span>;
      case 'Completed':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800">Completed</span>;
      case 'Canceled':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Canceled</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Interview Scheduling</h1>
            <p className="text-indigo-600">Manage and track all candidate interviews</p>
          </div>
          <button
            onClick={() => { setCurrentInterview(null); setIsModalOpen(true); }}
            className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="mr-2" /> Schedule Interview
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-indigo-500">
            <div className="text-sm font-medium text-gray-500">Total Interviews</div>
            <div className="text-2xl font-bold text-indigo-600">{interviews.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-blue-500">
            <div className="text-sm font-medium text-gray-500">Scheduled</div>
            <div className="text-2xl font-bold text-blue-600">{interviews.filter(i => i.status === 'Scheduled').length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-teal-500">
            <div className="text-sm font-medium text-gray-500">Completed</div>
            <div className="text-2xl font-bold text-teal-600">{interviews.filter(i => i.status === 'Completed').length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-rose-500">
            <div className="text-sm font-medium text-gray-500">Canceled</div>
            <div className="text-2xl font-bold text-rose-600">{interviews.filter(i => i.status === 'Canceled').length}</div>
          </div>
        </div>

        {/* Interviews List */}
        <div className="space-y-6">
          {interviews.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="mx-auto h-24 w-24 text-indigo-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No interviews scheduled</h3>
              <p className="text-gray-500 mb-4">Get started by scheduling your first interview</p>
              <button
                onClick={() => { setCurrentInterview(null); setIsModalOpen(true); }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiPlus className="mr-2" /> Schedule Interview
              </button>
            </div>
          ) : (
            interviews.map((interview) => (
              <div key={interview.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FiUser className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-indigo-900">{interview.candidate.name}</h3>
                      <p className="text-indigo-600 font-medium">{interview.candidate.position}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 w-full md:w-auto">
                    <button
                      onClick={() => handleEdit(interview)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiEdit2 className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(interview)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FiTrash2 className="mr-2" /> Cancel
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-2">Interview Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <FiCalendar className="mr-2 text-indigo-400" />
                          <span className="font-medium">{interview.date} at {interview.time}</span>
                          <span className="text-gray-500 ml-2">({interview.duration} mins)</span>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">Type:</span> {interview.type}
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">Location:</span> {interview.location}
                        </div>
                        <div className="mt-2">
                          {getStatusBadge(interview.status)}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-2">Interviewers</h4>
                      <ul className="space-y-1">
                        {interview.interviewers.map((interviewer, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-center">
                            <span className="inline-block h-2 w-2 rounded-full bg-indigo-400 mr-2"></span>
                            {interviewer}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-4 bg-indigo-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-2">Candidate Contact</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <FiMail className="mr-2 text-indigo-400" />
                          {interview.candidate.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <FiPhone className="mr-2 text-indigo-400" />
                          {interview.candidate.phone}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-2">Notes</h4>
                      <div className="text-sm text-gray-700 whitespace-pre-line">
                        {interview.notes || 'No notes added'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Interview Form Modal */}
        {isModalOpen && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="bg-white px-6 pt-5 pb-4 sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-2xl leading-6 font-bold text-indigo-900 mb-4">
                        {currentInterview ? 'Edit Interview' : 'Schedule New Interview'}
                      </h3>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-6">
                            <label htmlFor="candidate" className="block text-sm font-medium text-indigo-700">Candidate*</label>
                            <select
                              id="candidate"
                              name="candidate"
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                              defaultValue={currentInterview?.candidate.id || ''}
                            >
                              <option value="">Select a candidate</option>
                              <option value="1">John Doe - Frontend Developer</option>
                              <option value="2">Jane Smith - Product Manager</option>
                              <option value="3">Alex Johnson - UX Designer</option>
                            </select>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="date" className="block text-sm font-medium text-indigo-700">Date*</label>
                            <input
                              type="date"
                              name="date"
                              id="date"
                              defaultValue={currentInterview?.date || ''}
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="time" className="block text-sm font-medium text-indigo-700">Time*</label>
                            <input
                              type="time"
                              name="time"
                              id="time"
                              defaultValue={currentInterview?.time || ''}
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="duration" className="block text-sm font-medium text-indigo-700">Duration (minutes)*</label>
                            <input
                              type="number"
                              name="duration"
                              id="duration"
                              defaultValue={currentInterview?.duration || '60'}
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="type" className="block text-sm font-medium text-indigo-700">Interview Type*</label>
                            <select
                              id="type"
                              name="type"
                              defaultValue={currentInterview?.type || ''}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                              required
                            >
                              <option value="">Select type</option>
                              <option value="Technical">Technical</option>
                              <option value="Behavioral">Behavioral</option>
                              <option value="Portfolio Review">Portfolio Review</option>
                              <option value="HR Screening">HR Screening</option>
                              <option value="Final Round">Final Round</option>
                            </select>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="location" className="block text-sm font-medium text-indigo-700">Location*</label>
                            <input
                              type="text"
                              name="location"
                              id="location"
                              defaultValue={currentInterview?.location || ''}
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium text-indigo-700">Status*</label>
                            <select
                              id="status"
                              name="status"
                              defaultValue={currentInterview?.status || 'Scheduled'}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                              required
                            >
                              <option value="Scheduled">Scheduled</option>
                              <option value="Completed">Completed</option>
                              <option value="Canceled">Canceled</option>
                            </select>
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="interviewers" className="block text-sm font-medium text-indigo-700">Interviewers*</label>
                            <select
                              id="interviewers"
                              name="interviewers"
                              multiple
                              defaultValue={currentInterview?.interviewers || []}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                              required
                            >
                              <option value="Jane Smith">Jane Smith</option>
                              <option value="Mike Johnson">Mike Johnson</option>
                              <option value="Sarah Williams">Sarah Williams</option>
                              <option value="David Brown">David Brown</option>
                            </select>
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="notes" className="block text-sm font-medium text-indigo-700">Notes</label>
                            <textarea
                              id="notes"
                              name="notes"
                              rows={3}
                              defaultValue={currentInterview?.notes || ''}
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            {currentInterview ? 'Update Interview' : 'Schedule Interview'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteConfirmOpen && (
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
                      <h3 className="text-lg leading-6 font-bold text-gray-900">Cancel Interview</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to cancel the interview with <span className="font-medium">{interviewToDelete?.candidate.name}</span>? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={confirmDelete}
                    className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel Interview
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDeleteConfirmOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Keep Scheduled
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

export default InterviewScheduling;