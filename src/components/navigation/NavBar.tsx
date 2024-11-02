import React, { useCallback } from 'react';
import { Avatar, Button } from 'react-daisyui';
import { useModalStore } from '../modal/store/modalStore';

const MODAL_ID = 'authenticationModal';

export const NavBar: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const { open } = useModalStore();

  const handleOpenModal = useCallback(() => {
    open(MODAL_ID, 'Authentication', 'Authentication Placeholder');
  }, [open]);

  return (
    <div className="flex-none gap-2">
      {isLoggedIn ? (
        <div className="dropdown dropdown-end relative">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio"
              shape="circle"
              size="sm"
            />
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[999] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
          >
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Help</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <Button onClick={handleOpenModal} className="btn btn-primary">
          Sign In
        </Button>
      )}
    </div>
  );
};
