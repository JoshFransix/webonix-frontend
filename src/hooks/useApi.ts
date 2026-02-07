import { useState, useCallback } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import axiosInstance from '@/lib/axios';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (config: AxiosRequestConfig) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T = any>(): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(async (config: AxiosRequestConfig): Promise<T | null> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axiosInstance.request<T>(config);
      setState({ data: response.data, isLoading: false, error: null });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage = error.response?.data 
        ? JSON.stringify(error.response.data)
        : error.message;
      
      setState({ data: null, isLoading: false, error: errorMessage });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

export function useGet<T = any>(url: string, config?: AxiosRequestConfig) {
  const { data, isLoading, error, execute, reset } = useApi<T>();

  const fetch = useCallback(() => {
    return execute({ ...config, url, method: 'GET' });
  }, [url, config, execute]);

  return { data, isLoading, error, fetch, reset };
}

export function usePost<T = any, D = any>() {
  const { data, isLoading, error, execute, reset } = useApi<T>();

  const post = useCallback((url: string, data: D, config?: AxiosRequestConfig) => {
    return execute({ ...config, url, method: 'POST', data });
  }, [execute]);

  return { data, isLoading, error, post, reset };
}

export function usePut<T = any, D = any>() {
  const { data, isLoading, error, execute, reset } = useApi<T>();

  const put = useCallback((url: string, data: D, config?: AxiosRequestConfig) => {
    return execute({ ...config, url, method: 'PUT', data });
  }, [execute]);

  return { data, isLoading, error, put, reset };
}

export function useDelete<T = any>() {
  const { data, isLoading, error, execute, reset } = useApi<T>();

  const remove = useCallback((url: string, config?: AxiosRequestConfig) => {
    return execute({ ...config, url, method: 'DELETE' });
  }, [execute]);

  return { data, isLoading, error, remove, reset };
}
