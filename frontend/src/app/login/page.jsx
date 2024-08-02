// src/app/login/page.jsx

'use client';

import { useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import LocalSwitcher from '../../components/Shared/LocaleSwitcher';

const LoginPage = () => {
  const t = useTranslations('login');
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();

  const handleLogin = async (event) => {
    event.preventDefault();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const result = await signIn('credentials', {
      redirect: false,
      login,
      password,
      callbackUrl,
    });
    if (!result.error) {
      router.push(callbackUrl);
    } else {
      setError(result.error);
    }
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="fixed top-4 right-4">
        <LocalSwitcher />
      </div>
      <Card className="m-4 p-4" shadow={false}>
        <Typography className="font-normal text-2xl" color="blue-gray">
          {t('title')}
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
              {t('login')}
            </Typography>
            <Input
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              onChange={handleLoginChange}
              placeholder="login"
              size="lg"
              type="text"
              value={login}
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
              onChange={handlePasswordChange}
              placeholder="********"
              size="lg"
              type="password"
              value={password}
            />
          </div>
          {error ? (
            <Typography className="mt-2 text-center text-lg" color="red">
              {error}
            </Typography>
          ) : null}
          <Button className="mt-6" fullWidth type="submit">
            {t('login')}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
