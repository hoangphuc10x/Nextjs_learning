'use client';
import { useEffect, useState } from 'react';
export default function UsingEffect() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('Effect sẽ chạy sau mỗi lần re render');
  });

  useEffect(() => {
    console.log('chạy 1 lần khi component mount');
  }, []);

  useEffect(() => {
    console.log('load sau khi count thay đổi');
  }, [count]);

  return (
    <main className="abc">
      <button onClick={() => setCount(count + 1)}>Add count</button>
    </main>
  );
}
