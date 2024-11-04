import { useCallback } from 'react';
import { create } from './createStore';

export interface ILoadingState {
  isLoading: boolean;
  loadingMessage?: string;
  setLoading: (isLoading: boolean, message?: string) => void;

  // Async loading wrapper
  withLoading: <T>(operation: () => Promise<T>, message?: string) => Promise<T>;
}

const loadingStore = create<ILoadingState>((set, get) => ({
  isLoading: false,
  loadingMessage: undefined,

  setLoading: (isLoading: boolean, message?: string) =>
    set(() => ({
      isLoading,
      loadingMessage: isLoading ? message : undefined,
    })),

  withLoading: async (operation, message = 'Loading...') => {
    try {
      get().setLoading(true, message);
      const result = await operation();
      get().setLoading(false);
      return result;
    } catch (error) {
      get().setLoading(false);
      throw error;
    }
  },
}));

export const useLoadingStore = (): {
  isLoading: boolean;
  loadingMessage?: string;
  setLoading: (isLoading: boolean, message?: string) => void;
  withLoading: <T>(operation: () => Promise<T>, message?: string) => Promise<T>;
} => {
  const state = loadingStore.getState();

  const setLoading = useCallback((isLoading: boolean, message?: string) => {
    loadingStore.setState(() => ({
      isLoading,
      loadingMessage: isLoading ? message : undefined,
    }));
  }, []);

  const withLoading = useCallback(async <T>(operation: () => Promise<T>, message?: string) => {
    try {
      setLoading(true, message);
      const result = await operation();
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, []);

  return {
    isLoading: state.isLoading,
    loadingMessage: state.loadingMessage,
    setLoading,
    withLoading,
  };
};
