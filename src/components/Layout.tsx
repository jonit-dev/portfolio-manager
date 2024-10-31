import React from 'react';
import { Navbar } from 'react-daisyui';

interface ILayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: ILayoutProps) {
  return (
    <div className='min-h-screen bg-base-100'>
      <div className='max-w-[1600px] mx-auto'>
        <Navbar className='bg-base-200/50 backdrop-blur-sm border-b border-primary/20'>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold text-primary'>
              Portfolio Manager
            </h1>
          </div>
        </Navbar>
        <main className='min-h-[calc(100vh-4rem)]'>{children}</main>
      </div>
    </div>
  );
}
