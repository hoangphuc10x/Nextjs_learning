import axios from 'axios';

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3030/graphql';

const gqlClient = axios.create({
  baseURL: GRAPHQL_ENDPOINT,
  withCredentials: true, // ← QUAN TRỌNG: gửi cookie access/refresh tự động
  headers: {
    'Content-Type': 'application/json',
  },
});

gqlClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          GRAPHQL_ENDPOINT,
          {
            query: `
                mutation {
                  refreshToken {
                    accessToken
                    expiresIn
                    refreshToken
                  }
                }
              `,
          },
          { withCredentials: true },
        );

        return gqlClient(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export async function gql<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await gqlClient.post('', { query, variables });

  if (response.data.errors?.length) {
    const message = response.data.errors[0]?.message || 'GraphQL Error';
    throw new Error(message);
  }

  return response.data.data as T;
}
