'use client';
import { useState } from 'react';
export default function EventPage() {
  const [text, setText] = useState('');
  const handleClick = () => {
    alert('input:  ${test}');
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎯 Event Handler</h1>
      <input
        type="text"
        placeholder="input here"
        value={text}
        onChange={e => setText(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full max-w-sm mb-4"
      />
      <button
        onClick={handleClick}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        SEND
      </button>
    </main>
  );
}
