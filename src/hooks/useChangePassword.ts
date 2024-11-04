import { supabase } from '../lib/supabase/supabaseClient';
import { useToastStore } from '../store/toastStore';
import { useAuthentication } from './useAuthentication';

export const useChangePassword = (): {
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
} => {
  const { showToast } = useToastStore();
  const { signInWithEmail } = useAuthentication();

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('User not authenticated');

      const email = user.email;
      if (!email) throw new Error('Email not found');

      await signInWithEmail(email, currentPassword);

      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      showToast({ message: 'Password changed successfully!', type: 'success' });
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : 'Failed to change password',
        type: 'error',
      });
    }
  };

  return { changePassword };
};
