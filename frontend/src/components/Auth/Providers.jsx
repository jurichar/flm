// src/components/Auth/Providers.jsx

'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../../lib/auth';

const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
};

export default Providers;
