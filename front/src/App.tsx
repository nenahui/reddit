import { Layout } from '@/components/layout/layout';
import { Forum } from '@/features/forum/forum';
import { NewForum } from '@/features/forum/newForum';
import { Login } from '@/features/users/login';
import { Register } from '@/features/users/register';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/register'} element={<Register />} />
      <Route
        path={'/*'}
        element={
          <Layout>
            <Routes>
              <Route path={'/'} element={<Forum />} />
              <Route path={'/new-forum'} element={<NewForum />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};
