import React, { forwardRef } from 'react';

interface IModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  showCloseButton?: boolean;
}

export const Modal = forwardRef<HTMLDivElement, IModalProps>(
  ({ title, children, onClose, isOpen, showCloseButton = true }, ref) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div
          ref={ref}
          className="modal-box relative w-11/12 max-w-lg z-[101]"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="font-bold text-center mb-2" id="modal-title">
            {title}
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <div className="py-4">{children}</div>
          {showCloseButton && (
            <div className="modal-action">
              <button className="btn" onClick={onClose} aria-label="Close modal">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
