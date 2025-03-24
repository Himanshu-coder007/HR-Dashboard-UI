import React from 'react';
import Sidebar from '../components/Sidebar';
import Home from './Home';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Static always-open sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto p-6">
        <Home />
      </main>
    </div>
  );
};

export default Dashboard;