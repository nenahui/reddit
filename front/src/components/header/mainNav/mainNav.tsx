import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

export const MainNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className='flex items-center gap-4 text-sm justify-between'>
      <Link
        to='/'
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname === '/' ? 'text-foreground' : 'text-foreground/60'
        )}
      >
        Home
      </Link>
      <Link
        to='/news'
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname === '/news' ? 'text-foreground' : 'text-foreground/60'
        )}
      >
        Add new post
      </Link>
    </nav>
  );
};
