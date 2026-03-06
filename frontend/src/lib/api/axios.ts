import axios, { AxiosError, AxiosRequestConfig } from 'axios';

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

  const response = await axios({
    method,
    url: `${BASE_API_URL}${url}`,
    data,
    withCredentials: true,
    ...config,
    headers: {...headers, ...config?.headers ?? {}},
  });

  return response;
}

const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => request<T>('get', url, undefined, config),
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => request<T>('post', url, data, config),
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => request<T>('put', url, data, config),
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => request<T>('patch', url, data, config),
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => request<T>('delete', url, undefined, config),
};

// pass Axios error and return serverside error message
export const extractAxiosErrMsg = (err : AxiosError, placeholderMsg: string = ""): string => {
  try {
    if (err.response?.status === 500) return placeholderMsg;

    const data : Object = (err.response?.data as Object);

    var msg : string = Object.entries(data).length > 0 ? Object.entries(data)[0][1]: "";

    return msg === "" ? placeholderMsg : msg;
  }
  catch {
    return placeholderMsg;
  }
}

/** Extract per-field validation errors from a 400 response. Keys are field names, values are arrays of messages. */
export const extractAxiosFieldErrors = (err: AxiosError): Record<string, string[]> => {
  if (err.response?.status !== 400 || err.response?.data == null) return {};
  const data = err.response.data as Record<string, unknown>;
  const out: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value.every((v): v is string => typeof v === 'string')) {
      out[key] = value;
    } else if (typeof value === 'string') {
      out[key] = [value];
    }
  }
  return out;
}

export default api;