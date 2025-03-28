import { FiDollarSign, FiCheck, FiX, FiEdit2, FiTrash2, FiPlus, FiUser, FiMail, FiPhone } from 'react-icons/fi';
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
    // In a real app, you would update the state or make an API call here
    setIsModalOpen(false);
    setCurrentOffer(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><FiCheck className="mr-1" /> Accepted</span>;
      case 'Pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case 'Rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><FiX className="mr-1" /> Rejected</span>;
      case 'Negotiating':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Negotiating</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Offer Management</h2>
        <button
          onClick={() => { setCurrentOffer(null); setIsModalOpen(true); }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="mr-2" /> Create Offer
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{offer.candidate.name}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{offer.candidate.position}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(offer.status)}
                <button
                  onClick={() => handleEdit(offer)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDeleteClick(offer)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Offer Details</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-medium">Salary</div>
                        <div className="flex items-center">
                          <FiDollarSign className="mr-1 text-gray-400" />
                          {offer.salary}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Bonus</div>
                        <div className="flex items-center">
                          <FiDollarSign className="mr-1 text-gray-400" />
                          {offer.bonus}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium">Benefits</div>
                        <div>{offer.benefits}</div>
                      </div>
                    </div>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Candidate Contact</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <FiMail className="mr-2 text-gray-400" />
                      {offer.candidate.email}
                    </div>
                    <div className="flex items-center mt-2">
                      <FiPhone className="mr-2 text-gray-400" />
                      {offer.candidate.phone}
                    </div>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Offer Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {offer.offerDate}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-line">
                    {offer.notes}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Form Modal */}
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
                    {currentOffer ? 'Edit Offer' : 'Create New Offer'}
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
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiDollarSign className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="salary"
                            id="salary"
                            defaultValue={currentOffer?.salary || ''}
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="bonus" className="block text-sm font-medium text-gray-700">Bonus</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiDollarSign className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="bonus"
                            id="bonus"
                            defaultValue={currentOffer?.bonus || ''}
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">Benefits</label>
                        <textarea
                          id="benefits"
                          name="benefits"
                          rows={3}
                          defaultValue={currentOffer?.benefits || ''}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="offerDate" className="block text-sm font-medium text-gray-700">Offer Date</label>
                        <input
                          type="date"
                          name="offerDate"
                          id="offerDate"
                          defaultValue={currentOffer?.offerDate || ''}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                          id="status"
                          name="status"
                          defaultValue={currentOffer?.status || 'Pending'}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option>Pending</option>
                          <option>Accepted</option>
                          <option>Rejected</option>
                          <option>Negotiating</option>
                        </select>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          defaultValue={currentOffer?.notes || ''}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                      >
                        {currentOffer ? 'Update Offer' : 'Create Offer'}
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Offer</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the offer for "{offerToDelete?.candidate.name}"? This action cannot be undone.
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

export default OfferManagement;