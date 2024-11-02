/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';
import { Input } from 'react-daisyui';

export interface IInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  className?: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, IInputFieldProps>(
  ({ type, placeholder, className, error, ...props }, ref) => {
    return (
      <div className="mb-6">
        <Input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`${className} ${error ? 'border-red-500' : ''}`}
          bordered
          {...(props as any)} // Spread the remaining props
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
