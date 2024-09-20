import { cn } from '@/lib/utils';
import type { User } from '@/types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  user: User | null;
}

export const MainNav: React.FC<Props> = ({ user }) => {
  const { pathname } = useLocation();

  return (
    <nav className='flex items-center gap-4 text-sm justify-between'>
      {user && (
        <Link
          to='/'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Forum
        </Link>
      )}
      <Link
        to='/new-forum'
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname === '/new-forum' ? 'text-foreground' : 'text-foreground/60'
        )}
      >
        Add new forum
      </Link>
    </nav>
  );
};
