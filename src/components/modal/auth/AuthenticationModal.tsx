import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../store/authStore';
import { useModalStore } from '../../../store/modalStore';
import { useToastStore } from '../../../store/toastStore';
import { Modal } from '../Modal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

const MODAL_ID = 'authenticationModal';

interface IAuthForm {
  email: string;
  password: string;
}

export const AuthenticationModal: React.FC = () => {
  const { close, isModalOpen } = useModalStore();
  const { signInWithEmail, signUpWithEmail } = useAuthStore();
  const { showToast } = useToastStore();
  const [isRegistering, setIsRegistering] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>();

  const isOpen = isModalOpen(MODAL_ID);

  const onSubmit = async (data: IAuthForm) => {
    try {
      if (isRegistering) {
        await signUpWithEmail(data.email, data.password);
        showToast({ message: 'Account created successfully!', type: 'success' });
      } else {
        await signInWithEmail(data.email, data.password);
        showToast({ message: 'Signed in successfully!', type: 'success' });
      }
      close();
    } catch (error) {
      console.error('Authentication error:', error);
      showToast({
        message: error instanceof Error ? error.message : 'Authentication failed',
        type: 'error',
      });
    }
  };

  return (
    <div className="font-sans">
      <Modal
        ref={modalRef}
        title={isRegistering ? 'Create Account' : 'Sign In'}
        onClose={close}
        isOpen={isOpen}
        showCloseButton={false}
      >
        {isRegistering ? (
          <RegisterForm onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} />
        ) : (
          <LoginForm onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} />
        )}
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-blue-500 text-center hover:underline w-full "
        >
          {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
        </button>
      </Modal>
    </div>
  );
};
