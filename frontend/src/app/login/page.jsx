// src/app/login/page.jsx

'use client';

import { useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth';

const LoginPage = () => {
  const t = useTranslations('LoginPage');
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });
    if (!result.error) {
      router.push('/');
    } else {
      setError(result.error);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card shadow={false} className="m-4 p-4">
        <Typography color="blue-gray" className="font-normal text-2xl">
          {t('title')}
        </Typography>
        <Typography className="mt-1 font-normal text-xl" color="gray">
          {t('welcome')}
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleLogin}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              className="-mb-3 text-lg"
              color="blue-gray"
              variant="h6"
            >
              {t('username')}
            </Typography>
            <Input
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              placeholder="username"
              size="lg"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <Typography
              className="-mb-3 text-lg"
              color="blue-gray"
              variant="h6"
            >
              {t('password')}
            </Typography>
            <Input
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              placeholder="********"
              size="lg"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {error && (
            <Typography color="red" className="mt-2 text-center text-lg">
              {error}
            </Typography>
          )}
          <Button className="mt-6" fullWidth type="submit">
            {t('signIn')}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
