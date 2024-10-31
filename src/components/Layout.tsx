import {
  BarChart2,
  HelpCircle,
  Home,
  LogOut,
  Menu as MenuIcon,
  Settings,
} from 'lucide-react';
import React from 'react';
import { Avatar, Navbar } from 'react-daisyui';

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <div className='min-h-screen bg-base-100'>
      <div className='max-w-[1600px] mx-auto'>
        <Navbar className='bg-base-200/50 backdrop-blur-sm border-b border-primary/20'>
          <div className='flex-1'>
            <div className='dropdown'>
              <label tabIndex={0} className='btn btn-ghost lg:hidden'>
                <MenuIcon className='h-5 w-5' />
              </label>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'
              >
                <NavMenuItems />
              </ul>
            </div>
            <h1 className='text-2xl font-bold text-primary ml-2'>
              Portfolio Manager
            </h1>
          </div>

          <div className='flex-none gap-2'>
            <div className='hidden lg:flex'>
              <ul className='menu menu-horizontal px-1'>
                <NavMenuItems />
              </ul>
            </div>

            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <Avatar
                  src='https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio'
                  shape='circle'
                  size='sm'
                />
              </label>
              <ul
                tabIndex={0}
                className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52'
              >
                <li>
                  <a>
                    <Settings className='h-4 w-4' /> Settings
                  </a>
                </li>
                <li>
                  <a>
                    <HelpCircle className='h-4 w-4' /> Help
                  </a>
                </li>
                <li>
                  <a>
                    <LogOut className='h-4 w-4' /> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Navbar>
        <main className='min-h-[calc(100vh-4rem)]'>{children}</main>
      </div>
    </div>
  );
};

const NavMenuItems = (): JSX.Element => (
  <>
    <li>
      <a>
        <Home className='h-4 w-4' /> Dashboard
      </a>
    </li>
    <li>
      <a>
        <BarChart2 className='h-4 w-4' /> Analytics
      </a>
    </li>
    <li>
      <a>
        <Settings className='h-4 w-4' /> Settings
      </a>
    </li>
  </>
);
