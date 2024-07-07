import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate('/');
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography color="blue-gray" variant="h4">
        {t('login.title')}
      </Typography>
      <Typography className="mt-1 font-normal" color="gray">
        {t('welcome')}
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography className="-mb-3" color="blue-gray" variant="h6">
            {t('login.email')}
          </Typography>
          <Input
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            placeholder="name@mail.com"
            size="lg"
          />
          <Typography className="-mb-3" color="blue-gray" variant="h6">
            {t('login.password')}
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
          {t('login.signin')}
        </Button>
      </form>
    </Card>
  );
};

export default LoginPage;
