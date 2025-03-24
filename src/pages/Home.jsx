import React from 'react';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        {/* Your main content will go here */}
      </div>
    </div>
  );
};

export default Home;