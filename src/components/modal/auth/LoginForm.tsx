import React, { FormEventHandler } from 'react';
import { Button } from 'react-daisyui';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputField } from '../../form/InputField';

interface IAuthForm {
  email: string;
  password: string;
}

interface ILoginFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<IAuthForm>;
  errors: FieldErrors<IAuthForm>;
}

export const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit, register, errors }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-6 p-6">
      <p className="text-center text-gray-500">Sign in to your account to continue</p>
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
        Sign In
      </Button>
    </form>
  );
};
