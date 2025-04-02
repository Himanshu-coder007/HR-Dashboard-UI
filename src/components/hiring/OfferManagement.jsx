import { FiDollarSign, FiCheck, FiX, FiEdit2, FiTrash2, FiPlus, FiUser, FiMail, FiPhone, FiCalendar, FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const OfferManagement = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      candidate: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        position: 'Frontend Developer',
      },
      offerDate: '2023-06-05',
      salary: '85000',
      bonus: '5000',
      benefits: 'Health insurance, 401k matching, flexible hours',
      status: 'Accepted',
      notes: 'Candidate was excited about the offer',
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
      offerDate: '2023-06-08',
      salary: '110000',
      bonus: '10000',
      benefits: 'Health insurance, 401k matching, stock options',
      status: 'Pending',
      notes: 'Waiting for candidate response',
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
      offerDate: '2023-05-30',
      salary: '95000',
      bonus: '7500',
      benefits: 'Health insurance, 401k matching, remote work',
      status: 'Rejected',
      notes: 'Candidate accepted another offer with higher salary',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statusOptions = ['All', 'Accepted', 'Pending', 'Rejected', 'Negotiating'];

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || offer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (offer) => {
    setCurrentOffer(offer);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (offer) => {
    setOfferToDelete(offer);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    setOffers(offers.filter(offer => offer.id !== offerToDelete.id));
    setIsDeleteConfirmOpen(false);
    setOfferToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setCurrentOffer(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800"><FiCheck className="mr-1" /> Accepted</span>;
      case 'Pending':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Pending</span>;
      case 'Rejected':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800"><FiX className="mr-1" /> Rejected</span>;
      case 'Negotiating':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Negotiating</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Offer Management</h1>
            <p className="text-indigo-600">Track and manage all candidate offers</p>
          </div>
          <button
            onClick={() => { setCurrentOffer(null); setIsModalOpen(true); }}
            className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="mr-2" /> Create Offer
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-indigo-700 mb-1">Search Offers</label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-indigo-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search by candidate name or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-indigo-700 mb-1">Status</label>
              <select
                id="status"
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-indigo-500">
            <div className="text-sm font-medium text-gray-500">Total Offers</div>
            <div className="text-2xl font-bold text-indigo-600">{offers.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-teal-500">
            <div className="text-sm font-medium text-gray-500">Accepted</div>
            <div className="text-2xl font-bold text-teal-600">{offers.filter(o => o.status === 'Accepted').length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-amber-500">
            <div className="text-sm font-medium text-gray-500">Pending</div>
            <div className="text-2xl font-bold text-amber-600">{offers.filter(o => o.status === 'Pending').length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-rose-500">
            <div className="text-sm font-medium text-gray-500">Rejected</div>
            <div className="text-2xl font-bold text-rose-600">{offers.filter(o => o.status === 'Rejected').length}</div>
          </div>
        </div>

        {/* Offers List */}
        <div className="space-y-6">
          {filteredOffers.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="mx-auto h-24 w-24 text-indigo-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No offers found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or create a new offer</p>
            </div>
          ) : (
            filteredOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FiUser className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-indigo-900">{offer.candidate.name}</h3>
                      <p className="text-indigo-600 font-medium">{offer.candidate.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-900">
                        ${parseInt(offer.salary).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Base Salary</div>
                    </div>
                    {getStatusBadge(offer.status)}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(offer)}
                        className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(offer)}
                        className="p-2 text-rose-600 hover:text-rose-900 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-2">Compensation</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <FiDollarSign className="mr-2 text-indigo-400" />
                          <span className="font-medium">Base Salary:</span> ${parseInt(offer.salary).toLocaleString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <FiDollarSign className="mr-2 text-indigo-400" />
                          <span className="font-medium">Signing Bonus:</span> ${parseInt(offer.bonus).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">Total:</span> ${(parseInt(offer.salary) + parseInt(offer.bonus)).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-2">Benefits</h4>
                      <div className="text-sm text-gray-700">
                        {offer.benefits}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-2">Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <FiCalendar className="mr-2 text-indigo-400" />
                          <span className="font-medium">Offer Date:</span> {offer.offerDate}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <FiMail className="mr-2 text-indigo-400" />
                          {offer.candidate.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <FiPhone className="mr-2 text-indigo-400" />
                          {offer.candidate.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-4 bg-indigo-50">
                  <h4 className="text-sm font-medium text-indigo-700 mb-2">Notes</h4>
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {offer.notes}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Offer Form Modal */}
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
                        {currentOffer ? 'Edit Offer' : 'Create New Offer'}
                      </h3>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-6">
                            <label htmlFor="candidate" className="block text-sm font-medium text-indigo-700">Candidate*</label>
                            <select
                              id="candidate"
                              name="candidate"
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                              defaultValue={currentOffer?.candidate.id || ''}
                              required
                            >
                              <option value="">Select a candidate</option>
                              <option value="1">John Doe - Frontend Developer</option>
                              <option value="2">Jane Smith - Product Manager</option>
                              <option value="3">Alex Johnson - UX Designer</option>
                            </select>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="salary" className="block text-sm font-medium text-indigo-700">Salary*</label>
                            <div className="mt-1 relative rounded-lg shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiDollarSign className="h-5 w-5 text-indigo-400" />
                              </div>
                              <input
                                type="text"
                                name="salary"
                                id="salary"
                                defaultValue={currentOffer?.salary || ''}
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-indigo-100 rounded-lg py-2"
                                required
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="bonus" className="block text-sm font-medium text-indigo-700">Bonus</label>
                            <div className="mt-1 relative rounded-lg shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiDollarSign className="h-5 w-5 text-indigo-400" />
                              </div>
                              <input
                                type="text"
                                name="bonus"
                                id="bonus"
                                defaultValue={currentOffer?.bonus || ''}
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-indigo-100 rounded-lg py-2"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="benefits" className="block text-sm font-medium text-indigo-700">Benefits*</label>
                            <textarea
                              id="benefits"
                              name="benefits"
                              rows={3}
                              defaultValue={currentOffer?.benefits || ''}
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="offerDate" className="block text-sm font-medium text-indigo-700">Offer Date*</label>
                            <input
                              type="date"
                              name="offerDate"
                              id="offerDate"
                              defaultValue={currentOffer?.offerDate || ''}
                              className="mt-1 block w-full border border-indigo-100 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium text-indigo-700">Status*</label>
                            <select
                              id="status"
                              name="status"
                              defaultValue={currentOffer?.status || 'Pending'}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                              required
                            >
                              <option value="Pending">Pending</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Negotiating">Negotiating</option>
                            </select>
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="notes" className="block text-sm font-medium text-indigo-700">Notes</label>
                            <textarea
                              id="notes"
                              name="notes"
                              rows={3}
                              defaultValue={currentOffer?.notes || ''}
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
                            {currentOffer ? 'Update Offer' : 'Create Offer'}
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
                      <h3 className="text-lg leading-6 font-bold text-gray-900">Delete Offer</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete the offer for <span className="font-medium">{offerToDelete?.candidate.name}</span>? This action cannot be undone.
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
                    Delete Offer
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

export default OfferManagement;