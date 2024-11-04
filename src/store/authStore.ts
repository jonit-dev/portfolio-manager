import { create } from 'zustand';
import { supabase } from '../lib/supabase/supabaseClient';

interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: null | {
    email: string;
    name?: string;
  };
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setUser: (user: IAuthState['user']) => void;
  logout: () => void;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<IAuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  setAuthenticated: value => set({ isAuthenticated: value }),
  setLoading: value => set({ isLoading: value }),
  setUser: user => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  signInWithEmail: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data.user) {
      set({
        user: {
          email: data.user.email || '',
          name: data.user.user_metadata?.name,
        },
        isAuthenticated: true,
        isLoading: false,
      });
    }
  },
  signUpWithEmail: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) throw error;

    if (!data.user?.identities?.length) {
      throw new Error('An account with this email already exists');
    }

    if (data.user) {
      set({
        user: {
          email: data.user.email || '',
          name: data.user.user_metadata?.name,
        },
        isAuthenticated: true,
        isLoading: false,
      });
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
  initializeAuth: async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        set({
          user: {
            email: session.user.email || '',
            name: session.user.user_metadata?.name,
          },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isLoading: false });
    }
  },
  changePassword: async (currentPassword, newPassword) => {
    const currentUser = get().user;
    if (!currentUser?.email) {
      throw new Error('No authenticated user found');
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: currentUser.email,
      password: currentPassword,
    });

    if (signInError) throw signInError;

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  },
  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    if (error) throw error;
  },
}));

// Initialize auth state when the store is created
useAuthStore.getState().initializeAuth();

// Listen for auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    useAuthStore.setState({
      user: {
        email: session.user.email || '',
        name: session.user.user_metadata?.name,
      },
      isAuthenticated: true,
      isLoading: false,
    });
  } else {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }
});
