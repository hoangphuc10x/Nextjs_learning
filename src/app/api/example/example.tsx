import { useState, useEffect } from 'react';
export default function DataFetcher() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(setData);
  }, []);
  return (
    <div className="p-4">{data ? JSON.stringify(data) : 'loading...'}</div>
  );
}
