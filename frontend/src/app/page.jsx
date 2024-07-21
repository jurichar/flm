// src/app/page.js

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('HomePage');
  const modules = [
    {
      name: 'module1',
      description: 'Module 1 description',
    },
    {
      name: 'module2',
      description: 'Module 2 description',
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {modules.map((mod) => (
          <div key={mod.name}>
            <h2>{mod.name}</h2>
            <p>{mod.description}</p>
            <Link href={`/modules/${mod.name}`}>Go to {mod.name}</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
