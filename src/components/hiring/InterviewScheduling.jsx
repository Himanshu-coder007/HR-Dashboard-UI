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
    // In a real app, you would update the state or make an API call here
    setIsModalOpen(false);
    setCurrentInterview(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Scheduled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Scheduled</span>;
      case 'Completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>;
      case 'Canceled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Canceled</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Interview Scheduling</h2>
        <button
          onClick={() => { setCurrentInterview(null); setIsModalOpen(true); }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="mr-2" /> Schedule Interview
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {interviews.map((interview) => (
          <div key={interview.id} className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{interview.candidate.name}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{interview.candidate.position}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(interview)}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiEdit2 className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(interview)}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiTrash2 className="mr-2" /> Cancel
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Interview Details</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      <span className="font-medium">{interview.date} at {interview.time}</span>
                      <span className="text-gray-500 ml-2">({interview.duration} minutes)</span>
                    </div>
                    <div className="mt-2">
                      <span className="font-medium">Type:</span> {interview.type}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {interview.location}
                    </div>
                    <div className="mt-2">
                      {getStatusBadge(interview.status)}
                    </div>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Interviewers</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="list-disc pl-5">
                      {interview.interviewers.map((interviewer, index) => (
                        <li key={index}>{interviewer}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Candidate Contact</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <FiMail className="mr-2 text-gray-400" />
                      {interview.candidate.email}
                    </div>
                    <div className="flex items-center mt-2">
                      <FiPhone className="mr-2 text-gray-400" />
                      {interview.candidate.phone}
                    </div>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-line">
                    {interview.notes || 'No notes'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>

      {/* Interview Form Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {currentInterview ? 'Edit Interview' : 'Schedule New Interview'}
                  </h3>
                  <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label htmlFor="candidate" className="block text-sm font-medium text-gray-700">Candidate</label>
                        <select
                          id="candidate"
                          name="candidate"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option>John Doe - Frontend Developer</option>
                          <option>Jane Smith - Product Manager</option>
                          <option>Alex Johnson - UX Designer</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          defaultValue={currentInterview?.date || ''}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                          type="time"
                          name="time"
                          id="time"
                          defaultValue={currentInterview?.time || ''}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                        <input
                          type="number"
                          name="duration"
                          id="duration"
                          defaultValue={currentInterview?.duration || '60'}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Interview Type</label>
                        <select
                          id="type"
                          name="type"
                          defaultValue={currentInterview?.type || ''}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option>Technical</option>
                          <option>Behavioral</option>
                          <option>Portfolio Review</option>
                          <option>HR Screening</option>
                          <option>Final Round</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          defaultValue={currentInterview?.location || ''}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                          id="status"
                          name="status"
                          defaultValue={currentInterview?.status || 'Scheduled'}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option>Scheduled</option>
                          <option>Completed</option>
                          <option>Canceled</option>
                        </select>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="interviewers" className="block text-sm font-medium text-gray-700">Interviewers</label>
                        <select
                          id="interviewers"
                          name="interviewers"
                          multiple
                          defaultValue={currentInterview?.interviewers || []}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option>Jane Smith</option>
                          <option>Mike Johnson</option>
                          <option>Sarah Williams</option>
                          <option>David Brown</option>
                        </select>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          defaultValue={currentInterview?.notes || ''}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                      >
                        {currentInterview ? 'Update Interview' : 'Schedule Interview'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Cancel Interview</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to cancel the interview with "{interviewToDelete?.candidate.name}"? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                >
                  Cancel Interview
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Keep Scheduled
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewScheduling;