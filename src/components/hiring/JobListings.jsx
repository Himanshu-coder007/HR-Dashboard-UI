import { FiPlus, FiEdit2, FiTrash2, FiEye, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useState } from 'react';

const JobListings = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'We are looking for an experienced frontend developer...',
      requirements: '3+ years of React experience, CSS expertise...',
      status: 'Open',
      applications: 24,
      posted: '2023-05-15',
      deadline: '2023-06-15',
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco',
      type: 'Full-time',
      description: 'Lead our product development team...',
      requirements: '5+ years PM experience, technical background...',
      status: 'In Progress',
      applications: 18,
      posted: '2023-05-10',
      deadline: '2023-05-31',
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'New York',
      type: 'Contract',
      description: 'Design beautiful user experiences...',
      requirements: 'Portfolio required, Figma expertise...',
      status: 'Closed',
      applications: 32,
      posted: '2023-04-01',
      deadline: '2023-04-30',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const handleEdit = (job) => {
    setCurrentJob(job);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    setJobs(jobs.filter(job => job.id !== jobToDelete.id));
    setIsDeleteConfirmOpen(false);
    setJobToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jobData = Object.fromEntries(formData.entries());
    
    if (currentJob) {
      // Update existing job
      setJobs(jobs.map(job => 
        job.id === currentJob.id ? { ...job, ...jobData } : job
      ));
    } else {
      // Create new job
      const newJob = {
        ...jobData,
        id: Math.max(...jobs.map(job => job.id), 0) + 1,
        applications: 0
      };
      setJobs([...jobs, newJob]);
    }
    
    setIsModalOpen(false);
    setCurrentJob(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><FiClock className="mr-1" /> Open</span>;
      case 'In Progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><FiCheckCircle className="mr-1" /> In Progress</span>;
      case 'Closed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><FiXCircle className="mr-1" /> Closed</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Job Listings</h2>
        <button
          onClick={() => { setCurrentJob(null); setIsModalOpen(true); }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="mr-2" /> Create New Job
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusBadge(job.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applications}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.deadline}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button 
                    onClick={() => handleEdit(job)} 
                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(job)} 
                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Job Form Modal */}
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
                    {currentJob ? 'Edit Job' : 'Create New Job'}
                  </h3>
                  <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title*</label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          defaultValue={currentJob?.title || ''}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department*</label>
                        <input
                          type="text"
                          name="department"
                          id="department"
                          defaultValue={currentJob?.department || ''}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location*</label>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          defaultValue={currentJob?.location || ''}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Employment Type*</label>
                        <select
                          id="type"
                          name="type"
                          defaultValue={currentJob?.type || 'Full-time'}
                          required
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status*</label>
                        <select
                          id="status"
                          name="status"
                          defaultValue={currentJob?.status || 'Open'}
                          required
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description*</label>
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          defaultValue={currentJob?.description || ''}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements*</label>
                        <textarea
                          id="requirements"
                          name="requirements"
                          rows={3}
                          defaultValue={currentJob?.requirements || ''}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="posted" className="block text-sm font-medium text-gray-700">Posted Date*</label>
                        <input
                          type="date"
                          name="posted"
                          id="posted"
                          defaultValue={currentJob?.posted || ''}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Application Deadline*</label>
                        <input
                          type="date"
                          name="deadline"
                          id="deadline"
                          defaultValue={currentJob?.deadline || ''}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                      >
                        {currentJob ? 'Update Job' : 'Create Job'}
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Job Listing</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the job listing for "{jobToDelete?.title}"? This action cannot be undone.
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
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteConfirmOpen(false)}
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

export default JobListings;