import { create } from 'zustand';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

interface IToast {
  message: string;
  type: ToastType;
  timeout?: number; // Optional timeout property
}

interface IToastState {
  toasts: IToast[];
  addToast: (toast: IToast) => void;
  removeToast: (message: string) => void;
}

export const useToastStore = create<IToastState>(set => ({
  toasts: [],
  addToast: toast => {
    set(state => ({ toasts: [...state.toasts, toast] }));

    // Set a timeout to remove the toast after the specified duration
    const timeout = toast.timeout || 5000; // Default timeout is 5000ms (5 seconds)
    setTimeout(() => {
      set(state => ({ toasts: state.toasts.filter(t => t.message !== toast.message) }));
    }, timeout);
  },
  removeToast: message =>
    set(state => ({ toasts: state.toasts.filter(t => t.message !== message) })),
}));
