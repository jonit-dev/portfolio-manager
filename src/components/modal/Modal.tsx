import React, { forwardRef } from 'react';
import { useModalStore } from '../../store/modal';

interface IModalProps {
  title: string;
  children: React.ReactNode;
}

interface IModalComponent
  extends React.ForwardRefExoticComponent<IModalProps & React.RefAttributes<HTMLDialogElement>> {
  Header: React.FC<{ children: React.ReactNode }>;
  Body: React.FC<{ children: React.ReactNode }>;
  Actions: React.FC<{ children: React.ReactNode }>;
}

const ModalHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="font-bold text-lg">{children}</div>
);

const ModalBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="py-4">{children}</div>
);

const ModalActions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="modal-action">{children}</div>
);

export const Modal = forwardRef<HTMLDialogElement, IModalProps>(({ title, children }, ref) => {
  const { close } = useModalStore();

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        {title && <ModalHeader>{title}</ModalHeader>}
        {children}
        <ModalActions>
          <form method="dialog">
            <button className="btn btn-error" onClick={close}>
              Close
            </button>
          </form>
        </ModalActions>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={close}>
        <button>close</button>
      </form>
    </dialog>
  );
}) as IModalComponent;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Actions = ModalActions;

Modal.displayName = 'Modal';
