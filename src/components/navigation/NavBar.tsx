import { Button } from 'react-daisyui';
import { useAuthStore } from '../../store/authStore';
import { useModalStore } from '../../store/modalStore';

export const NavBar = (): JSX.Element => {
  const { open } = useModalStore();
  const { isAuthenticated, user, signOut } = useAuthStore();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut();
    } else {
      open('authenticationModal');
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Portfolio Manager</a>
      </div>
      <div className="flex-none gap-2">
        {isAuthenticated && <span className="text-sm text-gray-600 mr-2">{user?.email}</span>}
        <Button onClick={handleAuthClick} className={isAuthenticated ? 'btn-error' : 'btn-primary'}>
          {isAuthenticated ? 'Sign Out' : 'Sign In'}
        </Button>
      </div>
    </div>
  );
};
