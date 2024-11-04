import { supabase } from '../lib/supabase/supabaseClient';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';

export const useAuthentication = (): {
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  user: { email: string; name?: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
} => {
  const { showToast } = useToastStore();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      showToast({ message: 'Signed in successfully!', type: 'success' });
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : 'Authentication failed',
        type: 'error',
      });
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      showToast({ message: 'Account created successfully!', type: 'success' });
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : 'Sign up failed',
        type: 'error',
      });
    }
  };

  const refreshUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      if (user) {
        useAuthStore.setState({
          user: {
            email: user.email || '',
            name: user.user_metadata?.name,
          },
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      useAuthStore.setState({ isLoading: false });
    }
  };

  return {
    signInWithEmail,
    signUpWithEmail,
    user,
    isAuthenticated,
    isLoading,
    refreshUser,
  };
};
