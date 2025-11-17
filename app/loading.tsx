import React from 'react';

const Loading: React.FC<{ message?: string }> = ({
  message = 'Loading...',
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-700">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default Loading;
