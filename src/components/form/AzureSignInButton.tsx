import React from 'react';
import { Button } from 'react-daisyui';
import { FaMicrosoft } from 'react-icons/fa'; // Assuming you have a Microsoft icon
import { useAzureSignIn } from '../../hooks/useAzureSignIn';

export const AzureSignInButton: React.FC = () => {
  const { signIn, loading } = useAzureSignIn();

  return (
    <Button
      onClick={signIn}
      disabled={loading}
      className="w-full p-2 flex items-center justify-center gap-2"
    >
      <FaMicrosoft />
      {loading ? 'Signing in...' : 'Continue with Azure'}
    </Button>
  );
};
