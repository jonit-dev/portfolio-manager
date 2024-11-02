import React, { useRef } from 'react';
import { useModalStore } from '../../store/modal';
import { Modal } from './Modal';

export const AuthenticationModal: React.FC = () => {
  const { open } = useModalStore();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
    modalRef.current?.showModal();
    open('Authentication', 'Authentication Placeholder');
  };

  return (
    <>
      <button onClick={handleOpenModal} className="btn">
        Open Authentication Modal
      </button>
      <Modal ref={modalRef} title="Authentication">
        <Modal.Body>
          <p>Authentication Placeholder</p>
        </Modal.Body>
      </Modal>
    </>
  );
};
