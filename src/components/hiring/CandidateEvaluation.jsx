import { FiStar, FiUser, FiCheck, FiX, FiClipboard, FiSearch, FiFilter, FiCalendar } from 'react-icons/fi';
import { useState } from 'react';

const CandidateEvaluation = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      position: 'Frontend Developer',
      interviewer: 'Jane Smith',
      interviewDate: '2023-06-01',
      ratings: {
        technical: 4,
        communication: 3,
        problemSolving: 5,
        culturalFit: 4,
      },
      averageRating: 4.0,
      feedback: 'Strong technical skills, especially in React. Could improve communication.',
      status: 'Recommended',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Product Manager',
      interviewer: 'Mike Johnson',
      interviewDate: '2023-06-02',
      ratings: {
        technical: 3,
        communication: 5,
        problemSolving: 4,
        culturalFit: 5,
      },
      averageRating: 4.25,
      feedback: 'Excellent communication and leadership skills. Technical knowledge could be stronger.',
      status: 'Highly Recommended',
    },
    {
      id: 3,
      name: 'Alex Johnson',
      position: 'UX Designer',
      interviewer: 'Sarah Williams',
      interviewDate: '2023-05-30',
      ratings: {
        technical: 5,
        communication: 4,
        problemSolving: 4,
        culturalFit: 3,
      },
      averageRating: 4.0,
      feedback: 'Outstanding design skills and portfolio. Cultural fit needs consideration.',
      status: 'Needs Review',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState('');

  const statusOptions = ['All', 'Recommended', 'Highly Recommended', 'Needs Review', 'Not Recommended'];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const addFeedback = () => {
    if (selectedCandidate && newFeedback.trim()) {
      setCandidates(candidates.map(candidate => 
        candidate.id === selectedCandidate.id 
          ? { ...candidate, feedback: candidate.feedback ? `${candidate.feedback}\n\n${newFeedback}` : newFeedback }
          : candidate
      ));
      setNewFeedback('');
      setIsFeedbackModalOpen(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Recommended':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Recommended</span>;
      case 'Highly Recommended':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800">Highly Recommended</span>;
      case 'Needs Review':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Needs Review</span>;
      case 'Not Recommended':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Not Recommended</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`h-5 w-5 ${star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Candidate Evaluation</h1>
            <p className="text-indigo-600">Review and assess candidate interview performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-2/3">
            <div className="relative rounded-lg shadow-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-indigo-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-indigo-500">
            <div className="text-sm font-medium text-gray-500">Total Candidates</div>
            <div className="text-2xl font-bold text-indigo-600">{candidates.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-blue-500">
            <div className="text-sm font-medium text-gray-500">Recommended</div>
            <div className="text-2xl font-bold text-blue-600">{candidates.filter(c => c.status === 'Recommended').length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-teal-500">
            <div className="text-sm font-medium text-gray-500">Highly Recommended</div>
            <div className="text-2xl font-bold text-teal-600">{candidates.filter(c => c.status === 'Highly Recommended').length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-amber-500">
            <div className="text-sm font-medium text-gray-500">Needs Review</div>
            <div className="text-2xl font-bold text-amber-600">{candidates.filter(c => c.status === 'Needs Review').length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-rose-500">
            <div className="text-sm font-medium text-gray-500">Not Recommended</div>
            <div className="text-2xl font-bold text-rose-600">{candidates.filter(c => c.status === 'Not Recommended').length}</div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-6">
          {filteredCandidates.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="mx-auto h-24 w-24 text-indigo-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No candidates found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FiUser className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-indigo-900">{candidate.name}</h3>
                      <p className="text-indigo-600 font-medium">{candidate.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-900">{candidate.averageRating}</div>
                      <div className="text-xs text-gray-500">Average Rating</div>
                    </div>
                    {getStatusBadge(candidate.status)}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-2">Interview Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <FiUser className="mr-2 text-indigo-400" />
                          <span className="font-medium">Interviewer:</span> {candidate.interviewer}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <FiCalendar className="mr-2 text-indigo-400" />
                          <span className="font-medium">Date:</span> {candidate.interviewDate}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-2">Ratings</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-medium text-gray-500">Technical Skills</div>
                          {renderStars(candidate.ratings.technical)}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-500">Communication</div>
                          {renderStars(candidate.ratings.communication)}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-500">Problem Solving</div>
                          {renderStars(candidate.ratings.problemSolving)}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-500">Cultural Fit</div>
                          {renderStars(candidate.ratings.culturalFit)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-4 bg-indigo-50">
                  <h4 className="text-sm font-medium text-indigo-700 mb-2">Feedback</h4>
                  <div className="text-sm text-gray-700 whitespace-pre-line mb-4">
                    {candidate.feedback}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setIsFeedbackModalOpen(true);
                    }}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiClipboard className="mr-2" /> Add Feedback
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Feedback Modal */}
        {isFeedbackModalOpen && selectedCandidate && (
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
                        Add Feedback for {selectedCandidate.name}
                      </h3>
                      <div className="flex items-center mb-4">
                        {getStatusBadge(selectedCandidate.status)}
                        <span className="ml-3 text-sm text-gray-500">
                          Interviewed on {selectedCandidate.interviewDate}
                        </span>
                      </div>
                      
                      <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-medium text-indigo-700 mb-2">Current Feedback</h4>
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                          {selectedCandidate.feedback || 'No feedback yet'}
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="newFeedback" className="block text-sm font-medium text-indigo-700 mb-1">
                          New Feedback
                        </label>
                        <textarea
                          id="newFeedback"
                          rows={4}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-indigo-100 rounded-lg p-2"
                          placeholder="Enter your detailed feedback..."
                          value={newFeedback}
                          onChange={(e) => setNewFeedback(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={addFeedback}
                    disabled={!newFeedback.trim()}
                    className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-base font-medium text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm ${!newFeedback.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Add Feedback
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsFeedbackModalOpen(false);
                      setNewFeedback('');
                    }}
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

export default CandidateEvaluation;