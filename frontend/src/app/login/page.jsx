// src/app/login/page.jsx
'use client';

import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const t = useTranslations('LoginPage');
  const router = useRouter();

  const handleLogin = () => {
    // onLogin();
    router.push('/');
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography color="blue-gray" className="font-normal text-2xl">
        {t('title')}
      </Typography>
      <Typography className="mt-1 font-normal text-xl" color="gray">
        {t('welcome')}
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography className="-mb-3 text-lg" color="blue-gray" variant="h6">
            {t('email')}
          </Typography>
          <Input
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            placeholder="name@mail.com"
            size="lg"
          />
          <Typography className="-mb-3 text-lg" color="blue-gray" variant="h6">
            {t('password')}
          </Typography>
          <Input
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            placeholder="********"
            size="lg"
            type="password"
          />
        </div>
        <Button className="mt-6" fullWidth onClick={handleLogin}>
          {t('signIn')}
        </Button>
      </form>
    </Card>
  );
};

export default LoginPage;
