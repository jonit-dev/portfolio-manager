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
          dialogRef.current.showModal(); // Show modal when isOpen is true
        } else {
          dialogRef.current.close(); // Close modal when isOpen is false
        }
      }
    }, [isOpen, ref]);

    return (
      <DaisyModal ref={ref} onClose={onClose} backdrop={true}>
        <DaisyModal.Header className="font-bold text-center mb-2">
          {title}

          <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={onClose}>
            ✕
          </button>
        </DaisyModal.Header>
        <DaisyModal.Body>{children}</DaisyModal.Body>
        <DaisyModal.Actions>
          {showCloseButton && (
            <button className="btn" onClick={onClose}>
              Close
            </button>
          )}
        </DaisyModal.Actions>
      </DaisyModal>
    );
  }
);

Modal.displayName = 'Modal';
