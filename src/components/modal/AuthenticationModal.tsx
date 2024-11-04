import React, { useRef, useState } from 'react';
import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';
import { useModalStore } from '../../store/modalStore';
import { useToastStore } from '../../store/toastStore';
import { InputField } from '../form/InputField';
import { SocialLoginButton } from '../form/SocialLoginButton';
import { Modal } from './Modal';

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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 p-6">
          <p className="text-center text-gray-500">
            {isRegistering
              ? 'Create an account to continue'
              : 'Sign in to your account to continue'}
          </p>
          <InputField
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type="email"
            placeholder="Email address"
            className="w-full"
            error={errors.email?.message}
          />
          <InputField
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            type="password"
            placeholder="Password"
            className="w-full"
            error={errors.password?.message}
          />
          <Button type="submit" className="btn-primary w-full p-2">
            {isRegistering ? 'Create Account' : 'Sign In'}
          </Button>
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 text-center hover:underline"
          >
            {isRegistering
              ? 'Already have an account? Sign in'
              : "Don't have an account? Create one"}
          </button>
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
          {!isRegistering && (
            <a href="#" className="text-blue-500 text-center hover:underline">
              Forgot password?
            </a>
          )}
        </form>
      </Modal>
    </div>
  );
};
