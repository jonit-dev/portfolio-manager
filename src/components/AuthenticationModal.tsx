import React from 'react';
import { useModalStore } from '../store/modal';
import { Modal } from './Modal';

export const AuthenticationModal: React.FC = () => {
  const { open } = useModalStore();

  const handleOpenModal = () => {
    open('Authentication', 'Authentication Placeholder');
  };

  return (
    <>
      <button onClick={handleOpenModal} className="btn">
        Open Authentication Modal
      </button>
      <Modal title="Authentication">
        <p>Authentication Placeholder</p>
      </Modal>
    </>
  );
};
