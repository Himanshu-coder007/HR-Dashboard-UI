// src/pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">403 - Access Denied</h1>
      <p className="text-lg mb-6">You don't have permission to access this page</p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Unauthorized;