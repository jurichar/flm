import { useState } from 'react';
import FormInputs from './FormInputs';
import PDFDocument from './PDFDocument';
import { PDFViewer } from '@react-pdf/renderer';

const App = () => {
  const currentDate = new Date();
  const user = {
    name: 'Fred PIERREAFEU',
    address: '1 rue X',
    postalCode: '75000',
    city: 'Paris',
    SIREN: '000000000',
  };

  const formattedDate = currentDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const [formValues, setFormValues] = useState({
    name: user.name,
    address: user.address,
    postalCode: user.postalCode,
    city: user.city,
    SIREN: user.SIREN,
    estimateNumber: 1,
    issueDate: formattedDate,
    clientName: '',
    clientAddress: '',
    clientPostalCode: '75000',
    clientCity: 'Paris',
    totalHT: 0,
    totalTVA: 0,
    totalTTC: 0,
    items: [],
  });

  const handleInputChange = (newValues) => {
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues, ...newValues };

      updatedValues.totalHT = updatedValues.items.reduce(
        (sum, item) => sum + parseFloat(item.unitPrice || 0),
        0,
      );
      updatedValues.totalTVA = updatedValues.items.reduce(
        (sum, item) =>
          sum +
          (parseFloat(item.TVA || 0) / 100) * parseFloat(item.unitPrice || 0),
        0,
      );
      updatedValues.totalTTC = updatedValues.items.reduce(
        (sum, item) => sum + parseFloat(item.total || 0),
        0,
      );

      return updatedValues;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '40%', padding: '10px' }}>
        <FormInputs onInputChange={handleInputChange} />
      </div>
      <PDFViewer height="600" width="920">
        <PDFDocument formValues={formValues} />
      </PDFViewer>
    </div>
  );
};

export default App;
