// src/pages/Hiring.jsx
import { useState } from 'react';
import { FiBriefcase, FiUsers, FiFileText, FiCalendar, FiClipboard, FiDollarSign, FiBarChart2 } from 'react-icons/fi';
import JobListings from '../components/hiring/JobListings';
import ApplicantTracking from '../components/hiring/ApplicantTracking';
import ResumeManagement from '../components/hiring/ResumeManagement';
import InterviewScheduling from '../components/hiring/InterviewScheduling';
import CandidateEvaluation from '../components/hiring/CandidateEvaluation';
import OfferManagement from '../components/hiring/OfferManagement';
import ReportsAnalytics from '../components/hiring/ReportsAnalytics';

const Hiring = () => {
  const [activeTab, setActiveTab] = useState('jobListings');

  const tabs = [
    { id: 'jobListings', label: 'Job Listings', icon: <FiBriefcase className="mr-2" /> },
    { id: 'applicantTracking', label: 'Applicant Tracking', icon: <FiUsers className="mr-2" /> },
    { id: 'resumeManagement', label: 'Resume Management', icon: <FiFileText className="mr-2" /> },
    { id: 'interviewScheduling', label: 'Interview Scheduling', icon: <FiCalendar className="mr-2" /> },
    { id: 'candidateEvaluation', label: 'Candidate Evaluation', icon: <FiClipboard className="mr-2" /> },
    { id: 'offerManagement', label: 'Offer Management', icon: <FiDollarSign className="mr-2" /> },
    { id: 'reportsAnalytics', label: 'Reports & Analytics', icon: <FiBarChart2 className="mr-2" /> },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'jobListings':
        return <JobListings />;
      case 'applicantTracking':
        return <ApplicantTracking />;
      case 'resumeManagement':
        return <ResumeManagement />;
      case 'interviewScheduling':
        return <InterviewScheduling />;
      case 'candidateEvaluation':
        return <CandidateEvaluation />;
      case 'offerManagement':
        return <OfferManagement />;
      case 'reportsAnalytics':
        return <ReportsAnalytics />;
      default:
        return <JobListings />;
    }
  };

  return (
    <div className="min-h-screen overflow-auto bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hiring Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your recruitment process efficiently with our hiring tools.
          </p>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default Hiring;