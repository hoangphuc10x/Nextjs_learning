import axios from 'axios';

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3030/graphql';

const gqlClient = axios.create({
  baseURL: GRAPHQL_ENDPOINT,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

gqlClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export async function gql<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await gqlClient.post('', { query, variables });

  if (response.data.errors?.length) {
    const message = response.data.errors[0].message;
    throw new Error(message);
  }

  return response.data.data as T;
}
