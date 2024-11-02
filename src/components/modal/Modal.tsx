import React, { forwardRef, useEffect } from 'react';
import { Modal as DaisyModal } from 'react-daisyui';

interface IModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean; // Added isOpen prop
}

export const Modal = forwardRef<HTMLDialogElement, IModalProps>(
  ({ title, children, onClose, isOpen }, ref) => {
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
      <DaisyModal ref={ref} onClose={onClose}>
        {' '}
        {/* Removed open prop */}
        <DaisyModal.Header className="font-bold">{title}</DaisyModal.Header>
        <DaisyModal.Body>{children}</DaisyModal.Body>
        <DaisyModal.Actions>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </DaisyModal.Actions>
      </DaisyModal>
    );
  }
);

Modal.displayName = 'Modal';
