import React, { FormEventHandler } from 'react';
import { Button } from 'react-daisyui';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputField } from '../../form/InputField';
import { IAuthForm } from './LoginForm';

interface IRegisterFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<IAuthForm>;
  errors: FieldErrors<IAuthForm>;
}

export const RegisterForm: React.FC<IRegisterFormProps> = ({ onSubmit, register, errors }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-6 p-6">
      <p className="text-center text-gray-500">Create an account to continue</p>
      <InputField
        {...register('email')}
        type="email"
        placeholder="Email address"
        className="w-full"
        error={errors.email?.message}
      />
      <InputField
        {...register('password')}
        type="password"
        placeholder="Password"
        className="w-full"
        error={errors.password?.message}
      />
      <Button type="submit" className="btn-primary w-full p-2">
        Create Account
      </Button>
    </form>
  );
};
