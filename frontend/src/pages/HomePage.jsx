import ModuleCard from '../components/Modules/ModuleCard';

const HomePage = ({ userModules, hasAccess }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {userModules.map((module, index) => (
          <ModuleCard hasAccess={hasAccess} key={index} moduleName={module} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
