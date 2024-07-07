import ModuleCalculatorPreview from '../src/components/Modules/ModuleCalculator/ModulePreview';
import ModuleEstimatePreview from '../src/components/Modules/ModuleEstimate/ModulePreview';
import ModuleInvoicePreview from '../src/components/Modules/ModuleInvoice/ModulePreview';

const modulePreviews = {
  Invoice: ModuleInvoicePreview,
  Estimate: ModuleEstimatePreview,
  Calculator: ModuleCalculatorPreview,
};

export default modulePreviews;
