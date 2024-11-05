import React from 'react';
import { FacebookSignInButton } from './FacebookSignInButton';
import { GoogleSignInButton } from './GoogleSignInButton';

export const SocialLoginButton: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <GoogleSignInButton />
      <FacebookSignInButton />
    </div>
  );
};
