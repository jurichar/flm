'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthorizedRoute = ({ children, requiredRole }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      router.push('/login'); // Redirect to login if not authenticated
    } else if (!session.user.roles.includes(requiredRole)) {
      router.push('/unauthorized'); // Redirect to unauthorized page if not authorized
    }
  }, [session, status, router, requiredRole]);

  if (
    status === 'loading' ||
    !session ||
    !session.user.roles.includes(requiredRole)
  ) {
    return <p>Loading...</p>; // You can return a spinner here
  }

  return children;
};

export default AuthorizedRoute;
