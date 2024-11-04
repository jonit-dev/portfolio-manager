import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../store/authStore';
import { useModalStore } from '../../../store/modalStore';
import { useToastStore } from '../../../store/toastStore';
import { Modal } from '../Modal';
import { ChangePasswordForm } from './ChangePasswordForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

const MODAL_ID = 'authenticationModal';

interface IAuthForm {
  email: string;
  password: string;
}

export const AuthenticationModal: React.FC = () => {
  const { close, isModalOpen } = useModalStore();
  const { signInWithEmail, signUpWithEmail, changePassword, resetPassword, isAuthenticated } =
    useAuthStore();
  const { showToast } = useToastStore();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>();

  const isOpen = isModalOpen(MODAL_ID);

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

  const handleForgotPassword = async (data: { email: string }) => {
    try {
      await resetPassword(data.email);
      showToast({ message: 'Password reset link sent! Check your email.', type: 'success' });
      close();
    } catch (error) {
      console.error('Reset password error:', error);
      showToast({
        message: error instanceof Error ? error.message : 'Failed to send reset link',
        type: 'error',
      });
    }
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    setIsRegistering(false);
  };

  return (
    <div className="font-sans">
      <Modal
        ref={modalRef}
        title={
          isRegistering
            ? 'Create Account'
            : isChangingPassword
              ? 'Change Password'
              : isForgotPassword
                ? 'Forgot Password'
                : 'Sign In'
        }
        onClose={close}
        isOpen={isOpen}
        showCloseButton={false}
      >
        {isChangingPassword ? (
          <ChangePasswordForm onSubmit={handleChangePassword} />
        ) : isForgotPassword ? (
          <>
            <ForgotPasswordForm onSubmit={handleForgotPassword} />
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-blue-500 text-center hover:underline w-full mt-4"
            >
              Back to Login
            </button>
          </>
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
              {!isRegistering && (
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-blue-500 text-center hover:underline w-full"
                >
                  Forgot Password?
                </button>
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
