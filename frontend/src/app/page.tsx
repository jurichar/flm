// app/page.tsx
import ModuleCard from '../components/Modules/ModuleCard';
import LocaleSwitcher from '../components/Shared/LocaleSwitcher';

const HomePage = () => {

  const userModules = ["module1", "module2", "module3", "module4"];

  return (
    <div>
      <div className="absolute right-8 top-8">
        <LocaleSwitcher />
      </div>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-full">
        {/* {userModules.map((module, index) => (
          <ModuleCard key={index} moduleName={module} />
        ))} */}
      </div>
    </div>
  );
};

export default HomePage;
