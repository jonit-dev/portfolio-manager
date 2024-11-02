import React from 'react';
import { Button } from 'react-daisyui';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

interface ISocialLoginButtonProps {
  provider: 'facebook' | 'google';
  onClick: () => void;
}

export const SocialLoginButton: React.FC<ISocialLoginButtonProps> = ({ provider, onClick }) => {
  const icon =
    provider === 'facebook' ? <FaFacebook className="mr-2" /> : <FaGoogle className="mr-2" />;
  const label = provider === 'facebook' ? 'Continue with Facebook' : 'Continue with Google';

  return (
    <Button onClick={onClick} className="flex items-center w-full p-2">
      {icon} {label}
    </Button>
  );
};
