"use client";

import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { redirect } from 'next/navigation';

const LoginPage = () => {
  // const { t } = useTranslation();

  const handleLogin = () => {
    redirect('/');
  };

  return (
    <Card color="transparent" shadow={false} className='w-1/2'>
      <Typography color="blue-gray" className="font-normal text-2xl">
        {('login.title')}
      </Typography>
      <Typography className="mt-1 font-normal text-xl" color="gray">
        {('welcome')}
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography className="-mb-3 text-lg" color="blue-gray" variant="h6">
            {('login.email')}
          </Typography>
          <Input
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            placeholder="name@mail.com"
            size="lg" crossOrigin={undefined} />
          <Typography className="-mb-3 text-lg" color="blue-gray" variant="h6">
            {('login.password')}
          </Typography>
          <Input
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            placeholder="********"
            size="lg"
            type="password" crossOrigin={undefined} />
        </div>
        <Button className="mt-6" fullWidth onClick={handleLogin}>
          {('login.signin')}
        </Button>
      </form>
    </Card>
  );
};

export default LoginPage;

