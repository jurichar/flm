import ModuleCalculatorPreview from "../components/Modules/ModuleCalculator/ModulePreview";
import ModuleEstimatePreview from "../components/Modules/ModuleEstimate/ModulePreview";
import ModuleEstimateGeneratorPreview from "../components/Modules/ModuleEstimateGenerator/ModulePreview";
import ModuleInvoicePreview from "../components/Modules/ModuleInvoice/ModulePreview";

const modulePreviews = {
  Invoice: ModuleInvoicePreview,
  Estimate: ModuleEstimatePreview,
  Estimate_Generator: ModuleEstimateGeneratorPreview,
  // Invoice_Generator: ModuleInvoiceGeneratorPreview,
  Calculator: ModuleCalculatorPreview,
};

export default modulePreviews;
