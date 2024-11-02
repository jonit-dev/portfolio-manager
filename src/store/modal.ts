import { create } from './createStore';
import { devtools } from './middleware';

interface IModalState {
  isOpen: boolean;
  content: string | null;
  title: string | null;
  open: (title: string, content: string) => void;
  close: () => void;
}

export const useModalStore = create<IModalState>(set => {
  const store = {
    isOpen: false,
    content: null,
    title: null,
    open: (title: string, content: string) => set(() => ({ isOpen: true, content, title })),
    close: () => set(() => ({ isOpen: false, content: null, title: null })),
  };

  return devtools(create(() => store)).getState();
});
