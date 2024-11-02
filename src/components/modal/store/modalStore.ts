import { create } from 'zustand';

interface IModalStore {
  isOpen: boolean;
  modalId: string | null;
  title: string;
  content: string;
  open: (modalId: string, title: string, content: string) => void;
  close: () => void;
  isModalOpen: (modalId: string) => boolean;
}

export const useModalStore = create<IModalStore>((set, get) => ({
  isOpen: false,
  modalId: null,
  title: '',
  content: '',
  open: (modalId: string, title: string, content: string) =>
    set({ isOpen: true, modalId, title, content }),
  close: () => set({ isOpen: false, modalId: null, title: '', content: '' }),
  isModalOpen: (modalId: string) => get().isOpen && get().modalId === modalId,
}));
