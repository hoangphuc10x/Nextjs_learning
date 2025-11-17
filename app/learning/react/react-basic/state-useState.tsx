'use client';
import { useState } from 'react';

export default function StatePage() {
  const [count, setCount] = useState(0);

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">🔢 useState</h1>
      <p className="mb-2 text-xl">Giá trị hiện tại: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Tăng
      </button>
    </main>
  );
}
