import { FiStar, FiUser, FiCheck, FiX, FiClipboard, FiSearch, FiFilter } from 'react-icons/fi';
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
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{status}</span>;
      case 'Highly Recommended':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{status}</span>;
      case 'Needs Review':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{status}</span>;
      case 'Not Recommended':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">{status}</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Candidate Evaluation</h2>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="relative rounded-md shadow-sm w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="block w-full md:w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{candidate.name}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{candidate.position}</p>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="text-lg font-semibold">{candidate.averageRating}</span>
                    <span className="text-gray-500 text-sm ml-1">/5</span>
                  </div>
                  {getStatusBadge(candidate.status)}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Interview Details</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div>
                      <span className="font-medium">Interviewer:</span> {candidate.interviewer}
                    </div>
                    <div className="mt-1">
                      <span className="font-medium">Date:</span> {candidate.interviewDate}
                    </div>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Ratings</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-medium">Technical Skills</div>
                        {renderStars(candidate.ratings.technical)}
                      </div>
                      <div>
                        <div className="font-medium">Communication</div>
                        {renderStars(candidate.ratings.communication)}
                      </div>
                      <div>
                        <div className="font-medium">Problem Solving</div>
                        {renderStars(candidate.ratings.problemSolving)}
                      </div>
                      <div>
                        <div className="font-medium">Cultural Fit</div>
                        {renderStars(candidate.ratings.culturalFit)}
                      </div>
                    </div>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Feedback</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="whitespace-pre-line mb-4">{candidate.feedback}</div>
                    <button
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        setIsFeedbackModalOpen(true);
                      }}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiClipboard className="mr-2" /> Add Feedback
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Modal */}
      {isFeedbackModalOpen && selectedCandidate && (
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
                    Add Feedback for {selectedCandidate.name}
                  </h3>
                  <div className="mt-2">
                    <textarea
                      rows={4}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Enter your feedback..."
                      value={newFeedback}
                      onChange={(e) => setNewFeedback(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={addFeedback}
                  disabled={!newFeedback.trim()}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm ${!newFeedback.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Add Feedback
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFeedbackModalOpen(false);
                    setNewFeedback('');
                  }}
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

export default CandidateEvaluation;