import axios, { AxiosResponse } from 'axios';
import globalRouter from '@/shared/globalRouter.ts';
import { AuthEntity } from '@/shared/models';

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
  if (response.status === 200) {
    localStorage.removeItem('accessToken');
    globalRouter.navigate && globalRouter.navigate("/login", {replace: true});
  }
  return response.data;
};

export const loginUserFn = async (data: { username: string; password: string; }) => {
  const response: AxiosResponse<AuthEntity> = await apiClient.post('/auth/login', {
    email: data.username,
    password: data.password,
  });
  return response.data;
}

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
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

        localStorage.setItem('accessToken', tokens.accessToken)
        originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        await logoutUserFn();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;