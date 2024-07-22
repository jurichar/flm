// src/components/Auth/Providers.jsx

'use client';

import { SessionProvider } from 'next-auth/react';

const Providers = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
