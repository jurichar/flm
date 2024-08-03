// src/app/page.js

'use client';

// import { useTranslations } from 'next-intl';
import ModuleCard from '../components/Modules/ModuleCard';

const Home = () => {
  // const t = useTranslations('HomePage');
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
            description={mod.description}
            key={index}
            link={mod.link}
            name={mod.name}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
