import axios, { AxiosError, AxiosRequestConfig } from 'axios';
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

  if (isBrowser) {
    function getCookie(name: string): string | null {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
      return null;
    }

    const csrfToken = getCookie('csrftoken');

    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }
  } else {
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
  } catch (error: any) {
    if (axios.isAxiosError(error)) throw error as AxiosError;
    console.error("API error", error);
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