import Loading from '../loading';
import { useRouter } from 'next/router';

function App() {
  const isLoading = true;

  return isLoading ? (
    <Loading message="Fetching data..." />
  ) : (
    <h1>I love you baby</h1>
  );
}
