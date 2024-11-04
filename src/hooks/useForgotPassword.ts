import { supabase } from '../lib/supabase/supabaseClient';
import { useToastStore } from '../store/toastStore';

interface IUseForgotPassword {
  resetPassword: (email: string) => Promise<void>;
  setNewPassword: (newPassword: string) => Promise<void>;
}

export const useForgotPassword = (): IUseForgotPassword => {
  const { showToast } = useToastStore();

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}`,
      });
      if (error) throw error;
      showToast({ message: 'Password reset link sent! Check your email.', type: 'success' });
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : 'Failed to send reset link',
        type: 'error',
      });
    }
  };

  const setNewPassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      showToast({ message: 'Password updated successfully!', type: 'success' });
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : 'Failed to update password',
        type: 'error',
      });
      throw error; // Re-throw to let form handle error state
    }
  };

  return { resetPassword, setNewPassword };
};
