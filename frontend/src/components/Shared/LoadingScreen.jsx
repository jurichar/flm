// src/components/LoadingScreen.jsx

'use client';

import { Spinner } from '@material-tailwind/react';

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-white opacity-90">
      <Spinner className="w-10 h-10" color="blue" />
    </div>
  );
};

export default LoadingScreen;
