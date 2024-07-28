'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import FormInputs from './FormInputs';
import PDFDocument from './PDFDocument';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button } from '@material-tailwind/react';
import apiClient from '../../../utils/apiClient';

const Module = () => {
  const { data: session } = useSession();
  const [formValues, setFormValues] = useState({
    name: 'j',
    address: '',
    postalCode: '',
    city: '',
    siren: '',
    bic: '',
    iban: '',
    invoiceNumber: 1,
    clientName: '',
    clientAddress: '',
    clientPostalCode: '',
    clientCity: '',
    TVA: 0,
    totalHT: 0.0,
    totalTVA: 0.0,
    totalTTC: 0.0,
    items: [],
  });

  const [bufferedValues, setBufferedValues] = useState(formValues);
  const [stableFormValues, setStableFormValues] = useState(formValues);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (session) {
      // console.log('Session:', session);
      const fetchUserData = async () => {
        try {
          console.log('Fetching user data:', session.user.uid);
          const response = await apiClient.get(
            `/api/user/retrieve/${session.user.uid}`,
          );
          const userData = response;
          console.log('User data login:', userData);
          setBufferedValues((prevValues) => ({
            ...prevValues,
            name: userData?.login || prevValues.name,
            address: userData.address || prevValues.address,
            postalCode: userData.postalCode || prevValues.postalCode,
            city: userData.city || prevValues.city,
            siren: userData.siren || prevValues.siren,
            bic: userData.bic || prevValues.bic,
            iban: userData.iban || prevValues.iban,
          }));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [session, setFormValues]);

  useEffect(() => {
    console.log('formValues updated:', formValues);
  }, [formValues]);

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

  const handleSaveInvoice = async () => {
    console.log('Error saving invoice');
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
        <PDFDownloadLink document={memoizedPDFDocument} fileName="invoice">
          <Button className="w-full mt-2">Download PDF</Button>
        </PDFDownloadLink>
        <Button className="w-full mt-2" onClick={handleSaveInvoice}>
          Save Invoice
        </Button>
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
