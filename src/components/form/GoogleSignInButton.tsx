import React from 'react';
import { Button } from 'react-daisyui';
import { FaGoogle } from 'react-icons/fa';
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn';

export const GoogleSignInButton: React.FC = () => {
  const { signIn, loading } = useGoogleSignIn();

  return (
    <Button
      onClick={signIn}
      disabled={loading}
      className="w-full p-2 flex items-center justify-center gap-2"
    >
      <FaGoogle />
      {loading ? 'Signing in...' : 'Continue with Google'}
    </Button>
  );
};
