'use client';

import modulePreviews from "@/src/utils/modulePreviews";
import { Card } from "@material-tailwind/react";
import { redirect } from "next/navigation";


const ModuleCard = ({ moduleName }: { moduleName: string }) => {
  const handleCardClick = (event: any) => {
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
