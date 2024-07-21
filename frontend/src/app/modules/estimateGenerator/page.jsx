// src/app/modules/estimateGenerator/page.jsx

'use client';

import { useState, useMemo, useEffect } from 'react';
import FormInputs from './FormInputs';
import PDFDocument from './PDFDocument';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button } from '@material-tailwind/react';

const Module = () => {
  const user = {
    name: 'Fred PIERREAFEU',
    address: '1 rue X',
    postalCode: '75000',
    city: 'Paris',
    SIREN: '000000000',
  };

  const [formValues] = useState({
    name: user.name,
    address: user.address,
    postalCode: user.postalCode,
    city: user.city,
    SIREN: user.SIREN,
    estimateNumber: 1,
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
    <div className="flex flex-col md:flex-row justify-between gap-8">
      <div className="min-w-2/5 p-1">
        <FormInputs
          formValues={bufferedValues}
          onInputChange={handleInputChange}
        />
        <PDFDownloadLink document={memoizedPDFDocument} fileName="estimate">
          <Button className="w-full">Download PDF</Button>
        </PDFDownloadLink>
      </div>
      <PDFViewer
        className="sticky top-4 w-full"
        height="700"
        showToolbar="false"
        width="full"
      >
        {memoizedPDFDocument}
      </PDFViewer>
    </div>
  );
};

export default Module;
