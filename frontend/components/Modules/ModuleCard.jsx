'use client';

import modulePreviews from '@/utils/modulePreviews';
import { Card } from '@material-tailwind/react';
import { redirect, useRouter } from 'next/navigation';

const ModuleCard = ({ moduleName }) => {
  const handleCardClick = (event) => {
    if (event.target.tagName !== 'INPUT') {
      redirect(`/module/${moduleName}`);
    }
  };

  const PreviewComponent = modulePreviews[moduleName];

  return (
    <Card className="w-auto p-4 h-80 text-xl" onClick={handleCardClick}>
      <h3>{moduleName}</h3>
      {PreviewComponent ? <PreviewComponent /> : <p>Component not found</p>}
    </Card>
  );
};

export default ModuleCard;
