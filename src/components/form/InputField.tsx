import React from 'react';
import { Input } from 'react-daisyui';

interface IInputFieldProps {
  type: string;
  placeholder: string;
  className?: string; // Allow passing custom className
}

export const InputField: React.FC<IInputFieldProps> = ({ type, placeholder, className }) => {
  return (
    <div className="mb-6">
      <Input type={type} placeholder={placeholder} className={className} />
    </div>
  );
};
