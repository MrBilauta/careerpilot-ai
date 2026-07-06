import { useState, useCallback } from "react";
import { api, type ApiError } from "@/lib/api";

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Generic hook for making API calls with loading and error state management.
 */
export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (promise: Promise<T>) => {
      setState({ data: null, isLoading: true, error: null });
      try {
        const data = await promise;
        setState({ data, isLoading: false, error: null });
        return data;
      } catch (err) {
        const apiError = err as ApiError;
        const errorMessage = apiError.detail || "An unexpected error occurred";
        setState({ data: null, isLoading: false, error: errorMessage });
        throw err;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}
