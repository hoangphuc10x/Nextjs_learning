'use client';
import { useState } from 'react';

export default function ConditionalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">🧩 Rẽ nhánh điều kiện</h1>
      <p className="text-xl mb-4">
        {isLoggedIn ? '✅ Đã đăng nhập' : '❌ Chưa đăng nhập'}
      </p>
      <button
        onClick={() => setIsLoggedIn(!isLoggedIn)}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        {isLoggedIn ? 'Đăng xuất' : 'Đăng Nhập'}
      </button>
    </main>
  );
}
