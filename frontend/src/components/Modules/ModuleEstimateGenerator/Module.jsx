import { useState, useMemo, useEffect } from 'react';
import FormInputs from './FormInputs';
import PDFDocument from './PDFDocument';
import { PDFViewer } from '@react-pdf/renderer';
import { Typography } from '@material-tailwind/react';

const Module = () => {
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

  const [formValues] = useState({
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
    TVA: 0,
    totalHT: 0,
    totalTVA: 0,
    totalTTC: 0,
    items: [],
  });

  const [bufferedValues, setBufferedValues] = useState(formValues);
  const [stableFormValues, setStableFormValues] = useState(formValues);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStableFormValues(bufferedValues);
    }, 1000);
    return () => clearTimeout(timer);
  }, [bufferedValues]);

  const handleInputChange = (newValues) => {
    newValues.totalHT = newValues.items
      .reduce(
        (sum, item) =>
          sum +
          parseFloat(item.unitPrice || 0) * parseFloat(item.quantity || 1),
        0,
      )
      .toFixed(2);
    newValues.totalTVA = newValues.items
      .reduce(
        (sum, item) =>
          sum +
          (parseFloat(newValues.TVA || 0) / 100) *
            parseFloat(item.unitPrice || 0) *
            parseFloat(item.quantity || 1),
        0,
      )
      .toFixed(2);
    newValues.totalTTC = (
      parseFloat(newValues.totalHT) + parseFloat(newValues.totalTVA)
    ).toFixed(2);
    setBufferedValues({ ...newValues });
  };

  const memoizedPDFDocument = useMemo(
    () => <PDFDocument formValues={stableFormValues} />,
    [stableFormValues],
  );

  return (
    <div className="flex flex-row">
      <div className="w-2/5 p-1">
        <FormInputs
          formValues={bufferedValues}
          onInputChange={handleInputChange}
        />
      </div>
      {bufferedValues === stableFormValues ? (
        <PDFViewer
          showToolbar={false}
          pageMode="useOutlines"
          pageLayout="singlePage"
          height="1080"
          width="920"
        >
          {memoizedPDFDocument}
        </PDFViewer>
      ) : (
        <Typography
          as="div"
          className="mb-2 h-2 w-72 rounded-full bg-gray-300"
          variant="paragraph"
        >
          &nbsp;
        </Typography>
      )}
    </div>
  );
};

export default Module;
