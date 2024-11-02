import React from 'react';
import { Button } from 'react-daisyui';
import { InputField } from './InputField';
import { SocialLoginButton } from './SocialLoginButton';

interface IAuthenticationModalContentProps {
  onContinue: () => void;
  onContinueWithFacebook: () => void;
  onContinueWithGoogle: () => void;
}

export const AuthenticationModalContent: React.FC<IAuthenticationModalContentProps> = ({
  onContinue,
  onContinueWithFacebook,
  onContinueWithGoogle,
}) => {
  return (
    <div className="flex flex-col space-y-4 p-6">
      <p className="text-center">Sign in to your account to continue</p>
      <InputField type="email" placeholder="Email address" />
      <InputField type="password" placeholder="Password" />
      <Button onClick={onContinue} className="btn-primary w-full p-2">
        Continue
      </Button>
      <p className="text-center">or</p>
      <div className="flex flex-col space-y-2">
        <SocialLoginButton provider="facebook" onClick={onContinueWithFacebook} />
        <SocialLoginButton provider="google" onClick={onContinueWithGoogle} />
      </div>
      <a href="#" className="text-blue-500 text-center">
        Forgot password?
      </a>
    </div>
  );
};
