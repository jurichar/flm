// src/app/page.js

'use client';

import { useTranslations } from 'next-intl';
import ModuleCard from '../components/Modules/ModuleCard';

export default function Home() {
  const t = useTranslations('HomePage');
  const modules = [
    {
      name: 'calculator',
      description: 'Module 1 description',
      link: 'calculator',
    },
    {
      name: 'invoice',
      description: 'Module 2 description',
      link: 'invoice',
    },
    {
      name: 'estimate',
      description: 'Module 2 description',
      link: 'estimate',
    },
    {
      name: 'invoice_generator',
      description: 'Module 2 description',
      link: 'invoiceGenerator',
    },
    {
      name: 'estimate generator',
      description: 'Module 2 description',
      link: 'estimateGenerator',
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-full">
        {modules.map((mod, index) => (
          <ModuleCard
            key={index}
            name={mod.name}
            description={mod.description}
            link={mod.link}
          />
        ))}
      </div>
    </main>
  );
}
