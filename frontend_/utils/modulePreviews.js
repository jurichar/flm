import ModuleCalculatorPreview from '../src/components/Modules/ModuleCalculator/ModulePreview';
import ModuleEstimatePreview from '../src/components/Modules/ModuleEstimate/ModulePreview';
import ModuleEstimateGeneratorPreview from '../src/components/Modules/ModuleEstimateGenerator/ModulePreview';
import ModuleInvoicePreview from '../src/components/Modules/ModuleInvoice/ModulePreview';
import ModuleInvoiceGeneratorPreview from '../src/components/Modules/ModuleInvoiceGenerator/ModulePreview';

const modulePreviews = {
  Invoice: ModuleInvoicePreview,
  Estimate: ModuleEstimatePreview,
  Estimate_Generator: ModuleEstimateGeneratorPreview,
  Invoice_Generator: ModuleInvoiceGeneratorPreview,
  Calculator: ModuleCalculatorPreview,
};

export default modulePreviews;
