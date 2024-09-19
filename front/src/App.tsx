import { Layout } from '@/components/layout/layout';
import { Home } from '@/features/home/home';
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
              <Route path={'/'} element={<Home />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};
