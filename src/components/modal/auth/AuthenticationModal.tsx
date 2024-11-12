import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../../lib/supabase/supabaseClient';
import { useAuthStore } from '../../../store/authStore';
import { useModalStore } from '../../../store/modalStore';
import { useToastStore } from '../../../store/toastStore';
import { SocialLoginButton } from '../../form/SocialLoginButton';
import { Modal } from '../Modal';
import { ChangePasswordForm } from './ChangePasswordForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { ForgotPasswordSetNewPasswordForm } from './ForgotPasswordSetNewPasswordForm';
import { IAuthForm, LoginForm, loginSchema } from './LoginForm';
import { RegisterForm } from './RegisterForm';

const MODAL_ID = 'authenticationModal';

export const AuthenticationModal: React.FC = () => {
  const { close: closeModal, isModalOpen, open } = useModalStore();
  const { signInWithEmail, signUpWithEmail, changePassword, resetPassword, isAuthenticated, user } =
    useAuthStore();
  const { showToast } = useToastStore();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: zodResolver(loginSchema),
  });

  const isOpen = isModalOpen(MODAL_ID);
  const isPasswordUser = user?.provider === 'email';

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(event => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsSettingNewPassword(true);
        open(MODAL_ID);
      } else if (event === 'SIGNED_OUT') {
        setIsSettingNewPassword(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [open]);

  useEffect(() => {
    if (isOpen && isAuthenticated && !isSettingNewPassword) {
      setIsChangingPassword(isPasswordUser);
    } else {
      setIsChangingPassword(false);
    }
  }, [isOpen, isAuthenticated, isSettingNewPassword, isPasswordUser]);

  const close = () => {
    setIsSettingNewPassword(false);
    closeModal();
  };

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

  const getModalTitle = () => {
    if (isRegistering) return 'Create Account';
    if (isChangingPassword) return 'Change Password';
    if (isForgotPassword) return 'Forgot Password';
    if (isSettingNewPassword) return 'Set New Password';
    return 'Sign In';
  };

  return (
    <div className="font-sans">
      <Modal title={getModalTitle()} onClose={close} isOpen={isOpen} showCloseButton={false}>
        {isChangingPassword && isPasswordUser ? (
          <ChangePasswordForm onSubmit={handleChangePassword} />
        ) : isSettingNewPassword ? (
          <ForgotPasswordSetNewPasswordForm onClose={close} />
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
            <SocialLoginButton />
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
