import { create } from './createStore';

interface IModalState {
  isOpen: boolean;
  content: string | null;
  title: string | null;
}

interface IModalStore extends IModalState {
  open: (title: string, content: string) => void;
  close: () => void;
}

const initialState: IModalState = {
  isOpen: false,
  content: null,
  title: null,
};

const store = create<IModalStore>(set => ({
  ...initialState,
  open: (title: string, content: string) => set(() => ({ isOpen: true, content, title })),
  close: () => set(() => ({ isOpen: false, content: null, title: null })),
}));

export const useModalStore = (): IModalStore => {
  const state = store.getState();
  return {
    isOpen: state.isOpen,
    content: state.content,
    title: state.title,
    open: state.open,
    close: state.close,
  };
};
