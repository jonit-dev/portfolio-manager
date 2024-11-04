import { JSX, useEffect } from 'react';
import { useModalStore } from '../../store/modalStore';
import { useToastStore } from '../../store/toastStore';

export const AuthErrorHandler = (): JSX.Element => {
  const { showToast } = useToastStore();
  const { open } = useModalStore();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('error=')) {
        const params = new URLSearchParams(hash.slice(1));
        const error = params.get('error_description');
        if (error) {
          showToast({ message: decodeURIComponent(error), type: 'error' });
          open('authenticationModal');
          // Clear the hash to prevent showing the error again on refresh
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    };

    // Check on mount and when hash changes
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [showToast, open]);

  return <></>;
};
