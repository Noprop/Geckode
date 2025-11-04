import axios, { AxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';

export const BASE_API_URL = 'http://localhost:8000/api/'

const isBrowser = typeof window !== 'undefined';

async function request<T = any>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  const headers: Record<string, string> = {};

  if (!isBrowser) {
    const cookies = require('next/headers').cookies;
    const cookieStore = await cookies();
    const serverCookies = cookieStore.getAll().map((c: any) => `${c.name}=${c.value}`).join('; ');

    if (serverCookies) {
      headers['Cookie'] = serverCookies;
    }
  }

  try {
    const response = await axios({
      method,
      url: `${BASE_API_URL}${url}`,
      data,
      withCredentials: true,
      headers,
      ...config,
    });

    return response;
  } catch (err: any) {
    if (err.response) {
      if (isBrowser) {
        window.location.href = '/login';
      } else {
        redirect('/login');
      }

      console.error('API Error:', err.response.status, err.response.data);
      throw new Error(`API Error ${err.response.status}: ${err.response.data.detail || 'Unknown'}`);
    } else if (err.request) {
      console.error('No response received:', err.request);
      throw new Error('No response from server.');
    } else {
      console.error('Error setting up request:', err.message);
      throw err;
    }
  }
}

const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => request<T>('get', url, undefined, config),
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => request<T>('post', url, data, config),
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => request<T>('put', url, data, config),
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => request<T>('patch', url, data, config),
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => request<T>('delete', url, undefined, config),
};

export default api;