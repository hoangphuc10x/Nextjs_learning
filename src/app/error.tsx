'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type ErrorProps = {
  title?: string;
  message?: string;
  statusCode?: number;
};

const ErrorPage: React.FC<ErrorProps> = ({
  title = 'Something went wrong!',
  message = 'An unexpected error occurred. Please try again later.',
  statusCode = 500,
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4">{statusCode}</h1>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={() => router.back()}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
