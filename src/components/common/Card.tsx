import React from 'react';

interface ICardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: ICardProps) {
  return (
    <div className={`card bg-base-200 shadow-xl ${className}`}>
      <div className='card-body'>
        <h2 className='card-title text-primary'>{title}</h2>
        {children}
      </div>
    </div>
  );
}
