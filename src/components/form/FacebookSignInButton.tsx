import React from 'react';
import { Button } from 'react-daisyui';
import { FaFacebook } from 'react-icons/fa';
import { useFacebookSignIn } from '../../hooks/useFacebookSignIn';

export const FacebookSignInButton: React.FC = () => {
  const { signIn, loading } = useFacebookSignIn();

  return (
    <Button
      onClick={signIn}
      disabled={loading}
      className="w-full p-2 flex items-center justify-center gap-2"
    >
      <FaFacebook />
      {loading ? 'Signing in...' : 'Continue with Facebook'}
    </Button>
  );
};
