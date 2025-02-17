import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const refreshAccessTokenFn = async () => {
  const response = await apiClient.post('/auth/refresh-token');
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await refreshAccessTokenFn();

        // Update the Authorization header and retry the original request
        originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        // Logout the user if token refresh fails
        await logoutUserFn();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error); // Handle other errors
  }
);

export default apiClient;