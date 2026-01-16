import React from 'react';

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Generating insights...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingSpinner;