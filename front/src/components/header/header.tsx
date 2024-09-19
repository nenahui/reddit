import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/userNav/userNav';
import { selectUser } from '@/features/users/usersSlice';
import { logout } from '@/features/users/usersThunks';
import { User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { MainNav } from './mainNav/mainNav';

export const Header: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <header className='sticky top-2 rounded-xl z-50 w-full max-w-sm mx-auto border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container px-0 flex h-14 max-w-screen-2xl justify-between w-full items-center'>
        <Link to='/' className='flex items-center'>
          <img src={'/logo.png'} className='h-5 w-6 mr-2' alt={'Taza Meken'} />
          <span className='hidden font-medium lg:inline-block'>Keddit</span>
        </Link>

        <MainNav />

        <nav className='flex items-center gap-2'>
          {user ? (
            <>
              <UserNav user={user} handleLogout={() => dispatch(logout())} />
            </>
          ) : (
            <Link to={'/login'}>
              <Button size={'sm'} className={'flex gap-1'}>
                Войти
                <User className={'size-4'} />
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
