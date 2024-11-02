import React, { useCallback, useRef } from 'react';
import { Button } from 'react-daisyui';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Modal } from './Modal';
import { useModalStore } from './store/modalStore';

const MODAL_ID = 'authenticationModal';

export const AuthenticationModal: React.FC = () => {
  const { open, close, isModalOpen } = useModalStore();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = useCallback(() => {
    open(MODAL_ID, 'Authentication', 'Authentication Placeholder');
  }, [open]);

  const isOpen = isModalOpen(MODAL_ID);

  return (
    <div className="font-sans">
      <Button onClick={handleOpenModal}>Open Authentication Modal</Button>
      <Modal ref={modalRef} title="Authentication" onClose={close} isOpen={isOpen}>
        <div className="flex flex-col space-y-4 p-6">
          <p className="text-center">Sign in to your account to continue</p>
          <input type="email" placeholder="Email address" className="input w-full p-2 mb-4" />
          <input type="password" placeholder="Password" className="input w-full p-2 mb-4" />
          <Button
            onClick={() => console.log('Continue clicked')}
            className="btn-primary w-full p-2"
          >
            Continue
          </Button>
          <p className="text-center">or</p>
          <div className="flex flex-col space-y-2">
            <Button
              onClick={() => console.log('Continue with Facebook clicked')}
              className="flex items-center w-full p-2"
            >
              <FaFacebook className="mr-2" /> Continue with Facebook
            </Button>
            <Button
              onClick={() => console.log('Continue with Google clicked')}
              className="flex items-center w-full p-2"
            >
              <FaGoogle className="mr-2" /> Continue with Google
            </Button>
          </div>
          <a href="#" className="text-blue-500 text-center">
            Forgot password?
          </a>
        </div>
      </Modal>
    </div>
  );
};
