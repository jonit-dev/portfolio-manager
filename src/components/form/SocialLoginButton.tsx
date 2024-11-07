import React from 'react';
import { AzureSignInButton } from './AzureSignInButton';
import { GoogleSignInButton } from './GoogleSignInButton';

export const SocialLoginButton: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <GoogleSignInButton />
      <AzureSignInButton />
    </div>
  );
};
