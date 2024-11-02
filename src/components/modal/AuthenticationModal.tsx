import React, { useRef } from 'react';
import { Button } from 'react-daisyui';
import { InputField } from '../form/InputField';
import { SocialLoginButton } from '../form/SocialLoginButton';
import { Modal } from './Modal';
import { useModalStore } from './store/modalStore';

const MODAL_ID = 'authenticationModal';

export const AuthenticationModal: React.FC = () => {
  const { close, isModalOpen } = useModalStore();
  const modalRef = useRef<HTMLDialogElement>(null);

  const isOpen = isModalOpen(MODAL_ID);

  return (
    <div className="font-sans">
      <Modal ref={modalRef} title="Authentication" onClose={close} isOpen={isOpen}>
        <div className="flex flex-col space-y-6 p-6">
          <p className="text-center text-gray-500">Sign in to your account to continue</p>
          <InputField type="email" placeholder="Email address" className="w-full" />
          <InputField type="password" placeholder="Password" className="w-full" />
          <Button
            onClick={() => console.log('Continue clicked')}
            className="btn-primary w-full p-2"
          >
            Continue
          </Button>
          <p className="text-center">or</p>
          <div className="flex flex-col space-y-2">
            <SocialLoginButton
              provider="facebook"
              onClick={() => console.log('Continue with Facebook clicked')}
            />
            <SocialLoginButton
              provider="google"
              onClick={() => console.log('Continue with Google clicked')}
            />
          </div>
          <a href="#" className="text-blue-500 text-center">
            Forgot password?
          </a>
        </div>
      </Modal>
    </div>
  );
};
