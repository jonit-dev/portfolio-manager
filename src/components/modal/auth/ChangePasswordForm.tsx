import React from 'react';
import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { useToastStore } from '../../../store/toastStore';
import { InputField } from '../../form/InputField';

interface IChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordForm: React.FC<{ onSubmit: (data: IChangePasswordForm) => void }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IChangePasswordForm>();
  const { showToast } = useToastStore();

  const onSubmitHandler = async (data: IChangePasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      showToast({ message: 'Passwords do not match', type: 'error' });
      return;
    }
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col space-y-6 p-6">
      <InputField
        {...register('currentPassword', {
          required: 'Current password is required',
        })}
        type="password"
        placeholder="Current Password"
        className="w-full"
        error={errors.currentPassword?.message}
      />
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
        Change Password
      </Button>
    </form>
  );
};
