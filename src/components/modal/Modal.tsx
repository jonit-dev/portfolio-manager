import React, { forwardRef, useEffect } from 'react';
import { Modal as DaisyModal } from 'react-daisyui';

interface IModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  showCloseButton?: boolean;
}

export const Modal = forwardRef<HTMLDialogElement, IModalProps>(
  ({ title, children, onClose, isOpen, showCloseButton = true }, ref) => {
    useEffect(() => {
      const dialogRef = ref as React.RefObject<HTMLDialogElement>;
      if (dialogRef.current) {
        if (isOpen) {
          dialogRef.current.showModal();
        } else {
          dialogRef.current.close();
        }
      }
    }, [isOpen, ref]);

    return (
      <DaisyModal
        ref={ref}
        onClose={onClose}
        backdrop={true}
        aria-labelledby="modal-title"
        role="dialog"
      >
        <DaisyModal.Header className="font-bold text-center mb-2" id="modal-title">
          {title}

          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </DaisyModal.Header>
        <DaisyModal.Body>{children}</DaisyModal.Body>
        <DaisyModal.Actions>
          {showCloseButton && (
            <button className="btn" onClick={onClose} aria-label="Close modal">
              Close
            </button>
          )}
        </DaisyModal.Actions>
      </DaisyModal>
    );
  }
);

Modal.displayName = 'Modal';
