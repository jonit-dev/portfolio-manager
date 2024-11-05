import React from 'react';
import { Button } from 'react-daisyui';
import { FaFacebook } from 'react-icons/fa';
import { supabase } from '../../lib/supabase/supabaseClient';
import { useModalStore } from '../../store/modalStore';
import { useToastStore } from '../../store/toastStore';

export const FacebookSignInButton: React.FC = () => {
  const { showToast } = useToastStore();
  const { open } = useModalStore();

  const handleFacebookSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    });

    if (error) {
      showToast({
        message: error.message || 'An error occurred during Facebook sign in.',
        type: 'error',
      });
      open('authenticationModal');
    } else {
      showToast({ message: 'Facebook sign in successful!', type: 'success' });
    }
  };

  return (
    <Button onClick={handleFacebookSignIn} className="flex items-center w-full p-2">
      <FaFacebook className="mr-2" /> Continue with Facebook
    </Button>
  );
};
