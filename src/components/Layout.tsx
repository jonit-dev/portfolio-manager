import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-cyber-black">
      <div className="max-w-[1600px] mx-auto">
        <header className="border-b border-cyber-primary/20 bg-cyber-darker/50 backdrop-blur-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
              Portfolio Manager
            </h1>
          </div>
        </header>
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}