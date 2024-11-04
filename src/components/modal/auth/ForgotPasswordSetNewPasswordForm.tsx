import React from 'react';
import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { useForgotPassword } from '../../../hooks/useForgotPassword';
import { useModalStore } from '../../../store/modalStore';
import { useToastStore } from '../../../store/toastStore';
import { InputField } from '../../form/InputField';

interface ISetNewPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export const ForgotPasswordSetNewPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISetNewPasswordForm>();
  const { setNewPassword } = useForgotPassword();
  const { showToast } = useToastStore();
  const { close } = useModalStore();

  const onSubmitHandler = async (data: ISetNewPasswordForm) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        showToast({ message: 'Passwords do not match', type: 'error' });
        return;
      }
      await setNewPassword(data.newPassword);
      close();
    } catch (error) {
      console.error('Error setting new password:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col space-y-6 p-6">
      <InputField
        {...register('newPassword', {
          required: 'New password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        type="password"
        placeholder="New Password"
        className="w-full"
        error={errors.newPassword?.message}
      />
      <InputField
        {...register('confirmPassword', {
          required: 'Please confirm your new password',
          validate: value => value === watch('newPassword') || 'The passwords do not match',
        })}
        type="password"
        placeholder="Confirm New Password"
        className="w-full"
        error={errors.confirmPassword?.message}
      />
      <Button type="submit" className="btn-primary w-full p-2">
        Set New Password
      </Button>
    </form>
  );
};
