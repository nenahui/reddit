import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from '@/types';
import { ExitIcon, PersonIcon, SymbolIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  user: User;
  handleLogout: () => void;
}

export const UserNav: React.FC<Props> = ({ user, handleLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='h-9 w-9 border bg-gray-200 border-muted-foreground/10'>
          <AvatarFallback className={'uppercase text-sm bg-gray-100'}>{user.username.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-44 bg-gray-200/50 backdrop-blur' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <p className='text-sm font-medium leading-none flex justify-between items-center'>
            {user.username} <PersonIcon />
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={'/login'}>
            Switch account <SymbolIcon className={'ml-auto'} />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Log out <ExitIcon className={'ml-auto'} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
