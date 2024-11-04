import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../store/authStore';
import { useModalStore } from '../../../store/modalStore';
import { useToastStore } from '../../../store/toastStore';
import { Modal } from '../Modal';
import { ChangePasswordForm } from './ChangePasswordForm';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

const MODAL_ID = 'authenticationModal';

interface IAuthForm {
  email: string;
  password: string;
}

export const AuthenticationModal: React.FC = () => {
  const { close, isModalOpen } = useModalStore();
  const { signInWithEmail, signUpWithEmail, changePassword, isAuthenticated } = useAuthStore();
  const { showToast } = useToastStore();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>();

  const isOpen = isModalOpen(MODAL_ID);

  // Set initial view based on authentication status
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setIsChangingPassword(true);
    } else {
      setIsChangingPassword(false);
    }
  }, [isOpen, isAuthenticated]);

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

  const handleChangePassword = async (data: { currentPassword: string; newPassword: string }) => {
    try {
      await changePassword(data.currentPassword, data.newPassword);
      showToast({ message: 'Password changed successfully!', type: 'success' });
      close();
    } catch (error) {
      console.error('Change password error:', error);
      showToast({
        message: error instanceof Error ? error.message : 'Failed to change password',
        type: 'error',
      });
    }
  };

  return (
    <div className="font-sans">
      <Modal
        ref={modalRef}
        title={
          isRegistering ? 'Create Account' : isChangingPassword ? 'Change Password' : 'Sign In'
        }
        onClose={close}
        isOpen={isOpen}
        showCloseButton={false}
      >
        {isChangingPassword ? (
          <ChangePasswordForm onSubmit={handleChangePassword} />
        ) : (
          <>
            {isRegistering ? (
              <RegisterForm onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} />
            ) : (
              <LoginForm onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} />
            )}
            <div className="flex flex-col gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-blue-500 text-center hover:underline w-full"
              >
                {isRegistering
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Create one"}
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
