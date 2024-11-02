import React, { useCallback, useRef } from 'react';
import { Button } from 'react-daisyui';
import { Modal } from './Modal';
import { useModalStore } from './store/modalStore';

const MODAL_ID = 'authenticationModal';

export const AuthenticationModal: React.FC = () => {
  const { open, close, title, isModalOpen } = useModalStore();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = useCallback(() => {
    open(MODAL_ID, 'Authentication', 'Authentication Placeholder');
  }, [open]);

  const isOpen = isModalOpen(MODAL_ID);

  return (
    <div className="font-sans">
      <Button onClick={handleOpenModal}>Open Authentication Modal</Button>
      <Modal ref={modalRef} title={title || 'Default Title'} onClose={close} isOpen={isOpen}>
        <p>Authentication Placeholder</p>
      </Modal>
    </div>
  );
};
