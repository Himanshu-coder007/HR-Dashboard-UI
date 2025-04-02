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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800"><FiClock className="mr-1" /> Open</span>;
      case 'In Progress':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><FiCheckCircle className="mr-1" /> In Progress</span>;
      case 'Closed':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800"><FiXCircle className="mr-1" /> Closed</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Job Listings</h1>
            <p className="text-indigo-600">Manage all your job postings in one place</p>
          </div>
          <button
            onClick={() => { setCurrentJob(null); setIsModalOpen(true); }}
            className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="mr-2" /> Create New Job
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-indigo-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-indigo-700 mb-1">Status</label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
                className="w-full px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-te-500">
            <h3 className="text-sm font-medium text-gray-500">Total Jobs</h3>
            <p className="text-3xl font-bold text-indigo-600">{jobs.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-teal-500">
            <h3 className="text-sm font-medium text-gray-500">Open Positions</h3>
            <p className="text-3xl font-bold text-teal-600">{jobs.filter(job => job.status === 'Open').length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-amber-500">
            <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
            <p className="text-3xl font-bold text-amber-600">{jobs.filter(job => job.status === 'In Progress').length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-rose-500">
            <h3 className="text-sm font-medium text-gray-500">Closed</h3>
            <p className="text-3xl font-bold text-rose-600">{jobs.filter(job => job.status === 'Closed').length}</p>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredJobs.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto h-24 w-24 text-indigo-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => { setCurrentJob(null); setIsModalOpen(true); }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiPlus className="mr-2" /> Create New Job
              </button>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Department</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Applications</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Deadline</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-indigo-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-indigo-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{job.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{job.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">{job.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(job.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium">
                          {job.applications}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{job.deadline}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button 
                        onClick={() => handleEdit(job)} 
                        className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-100 transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(job)} 
                        className="text-rose-600 hover:text-rose-900 p-2 rounded-lg hover:bg-rose-100 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Job Form Modal */}
        {isModalOpen && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-2xl leading-6 font-bold text-indigo-900 mb-4">
                        {currentJob ? 'Edit Job' : 'Create New Job'}
                      </h3>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-6">
                            <label htmlFor="title" className="block text-sm font-medium text-indigo-700">Job Title*</label>
                            <input
                              type="text"
                              name="title"
                              id="title"
                              defaultValue={currentJob?.title || ''}
                              required
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="department" className="block text-sm font-medium text-indigo-700">Department*</label>
                            <input
                              type="text"
                              name="department"
                              id="department"
                              defaultValue={currentJob?.department || ''}
                              required
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="location" className="block text-sm font-medium text-indigo-700">Location*</label>
                            <input
                              type="text"
                              name="location"
                              id="location"
                              defaultValue={currentJob?.location || ''}
                              required
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="type" className="block text-sm font-medium text-indigo-700">Employment Type*</label>
                            <select
                              id="type"
                              name="type"
                              defaultValue={currentJob?.type || 'Full-time'}
                              required
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                            >
                              <option value="Full-time">Full-time</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Contract">Contract</option>
                              <option value="Internship">Internship</option>
                            </select>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium text-indigo-700">Status*</label>
                            <select
                              id="status"
                              name="status"
                              defaultValue={currentJob?.status || 'Open'}
                              required
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                            >
                              <option value="Open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="description" className="block text-sm font-medium text-indigo-700">Job Description*</label>
                            <textarea
                              id="description"
                              name="description"
                              rows={4}
                              defaultValue={currentJob?.description || ''}
                              required
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="requirements" className="block text-sm font-medium text-indigo-700">Requirements*</label>
                            <textarea
                              id="requirements"
                              name="requirements"
                              rows={4}
                              defaultValue={currentJob?.requirements || ''}
                              required
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="posted" className="block text-sm font-medium text-indigo-700">Posted Date*</label>
                            <input
                              type="date"
                              name="posted"
                              id="posted"
                              defaultValue={currentJob?.posted || ''}
                              required
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="deadline" className="block text-sm font-medium text-indigo-700">Application Deadline*</label>
                            <input
                              type="date"
                              name="deadline"
                              id="deadline"
                              defaultValue={currentJob?.deadline || ''}
                              required
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
                            {currentJob ? 'Update Job' : 'Create Job'}
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
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FiTrash2 className="h-6 w-6 text-rose-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Job Listing</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete the job listing for "{jobToDelete?.title}"? This action cannot be undone.
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
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDeleteConfirmOpen(false)}
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

export default JobListings;