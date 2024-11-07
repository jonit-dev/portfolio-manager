import { useState } from 'react';
import { supabase } from '../lib/supabase/supabaseClient';
import { useModalStore } from '../store/modalStore';
import { useToastStore } from '../store/toastStore';

export const useAzureSignIn = (): { signIn: () => Promise<void>; loading: boolean } => {
  const { showToast } = useToastStore();
  const { open } = useModalStore();
  const [loading, setLoading] = useState(false);

  const signIn = async (): Promise<void> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          scopes: 'email profile',
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        console.error('Azure sign-in error:', error);
        showToast({ message: error.message || 'An error occurred during sign in.', type: 'error' });
        open('authenticationModal');
      }
    } catch (error) {
      console.error('Unexpected error during Azure sign-in:', error);
      showToast({
        message: error instanceof Error ? error.message : 'An unexpected error occurred.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
};
