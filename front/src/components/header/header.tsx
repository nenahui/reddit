import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/header/components/userNav/userNav';
import { selectUser } from '@/features/users/usersSlice';
import { logout } from '@/features/users/usersThunks';
import { User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { MainNav } from '@/components/header/components/mainNav/mainNav';

export const Header: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <header
      className={`sticky mb-6 top-2 rounded-full z-50 ${user?.token ? 'w-full' : 'w-56'} max-w-md mx-auto border-border/40 backdrop-blur supports-[backdrop-filter]:bg-gray-200/60`}
    >
      <div className='container px-0 flex h-14 max-w-screen-2xl justify-between w-full items-center'>
        <Link to='/' className='flex items-center'>
          <img src={'/logo.png'} className='h-5 w-6 mr-2' alt={'Taza Meken'} />
          <span className='hidden font-medium lg:inline-block'>Keddit</span>
        </Link>

        <MainNav user={user} />

        <nav className='flex items-center gap-2'>
          {user ? (
            <>
              <UserNav user={user} handleLogout={() => dispatch(logout())} />
            </>
          ) : (
            <Link to={'/login'}>
              <Button size={'sm'} className={`flex gap-1 ${!user && 'rounded-full'}`}>
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
