import { useParams, Navigate } from 'react-router-dom';
import ModuleInvoice from '../components/Modules/ModuleInvoice/Module';
import ModuleEstimate from '../components/Modules/ModuleEstimate/Module';
import ModuleCalculator from '../components/Modules/ModuleCalculator/Module';

const modulesMap = {
  Invoice: ModuleInvoice,
  Estimate: ModuleEstimate,
  Calculator: ModuleCalculator,
};

const ModulePage = ({ hasAccess }) => {
  const { moduleName } = useParams();

  if (!hasAccess(moduleName)) {
    return <Navigate replace to="/" />;
  }

  const ModuleComponent = modulesMap[moduleName];

  return ModuleComponent ? <ModuleComponent /> : <div>Module Not Found</div>;
};

export default ModulePage;
