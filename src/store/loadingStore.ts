import { useCallback } from 'react';
import { create } from './createStore';

export interface ILoadingState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const loadingStore = create<ILoadingState>(set => ({
  isLoading: false,
  setLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));

export const useLoadingStore = (): {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
} => {
  const state = loadingStore.getState();

  const setLoading = useCallback((isLoading: boolean) => {
    loadingStore.setState(() => ({ isLoading }));
  }, []);

  return {
    isLoading: state.isLoading,
    setLoading,
  };
};
