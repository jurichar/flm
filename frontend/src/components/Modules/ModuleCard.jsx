// src/components/Modules/ModuleCard.jsx

'use client';

import { Button, Card } from '@material-tailwind/react';
import Link from 'next/link';

const ModuleCard = ({ name, description, link }) => {
  return (
    <Card className="w-auto p-4 h-80 text-xl">
      <h2>{name}</h2>
      <p>{description}</p>
      <Link href={`/modules/${link}`}>
        <Button className="mt-4">Go to {name}</Button>
      </Link>
    </Card>
  );
};

export default ModuleCard;
