import React, { FormEventHandler } from 'react';
import { Button } from 'react-daisyui';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { loginSchema } from 'src/validation/authValidationSchema';
import { z } from 'zod';
import { InputField } from '../../form/InputField';

export type ILoginForm = z.infer<typeof loginSchema>;

interface ILoginFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<ILoginForm>;
  errors: FieldErrors<ILoginForm>;
}

export const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit, register, errors }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-6 p-6">
      <p className="text-center text-gray-500">Sign in to your account to continue</p>
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
        Sign In
      </Button>
    </form>
  );
};
