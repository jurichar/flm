import ModuleCard from '../components/Modules/ModuleCard';

const HomePage = ({ userModules, hasAccess }) => {
  return (
    <div>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-full">
        {userModules.map((module, index) => (
          <ModuleCard hasAccess={hasAccess} key={index} moduleName={module} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
