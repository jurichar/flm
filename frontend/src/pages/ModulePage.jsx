import { useParams, Navigate } from 'react-router-dom';
import ModuleInvoice from '../components/Modules/ModuleInvoice/Module';
import ModuleEstimate from '../components/Modules/ModuleEstimate/Module';
import ModuleCalculator from '../components/Modules/ModuleCalculator/Module';
import ModuleEstimateGenerator from '../components/Modules/ModuleEstimateGenerator/Module';
import ModuleInvoiceGenerator from '../components/Modules/ModuleInvoiceGenerator/Module';

const modulesMap = {
  Invoice: ModuleInvoice,
  Estimate: ModuleEstimate,
  Estimate_Generator: ModuleEstimateGenerator,
  Invoice_Generator: ModuleInvoiceGenerator,
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
