// src/app/modules/invoice/edit/[invoice_id]/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { PDFViewer } from '@react-pdf/renderer';
import FormInputs from '../../new/FormInputs';
import PDFDocument from '../../new/PDFDocument';
import apiClient from '../../../../../utils/apiClient';
import { usePathname, useRouter } from 'next/navigation';

const InvoiceEditPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const invoice_uid = pathname.split('/').pop();
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  useEffect(() => {
    if (invoice_uid) {
      const fetchInvoiceDetails = async () => {
        try {
          const response = await apiClient.get(
            `/api/invoice/retrieve/${invoice_uid}`,
          );
          setInvoiceDetails(response.data);
        } catch (error) {
          console.error('Error fetching invoice details:', error);
        }
      };

      fetchInvoiceDetails();
    }
  }, [invoice_uid]);

  const handleSaveChanges = async () => {
    console.log('Saving changes:', invoiceDetails);
  };

  if (!invoiceDetails) return <p>Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8">
      <div className="min-w-2/5 p-1">
        <FormInputs formValues={invoiceDetails} />
        <Button color="green" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
      <PDFViewer className="sticky top-4 w-full" height="700" width="full">
        <PDFDocument formValues={invoiceDetails} />
      </PDFViewer>
    </div>
  );
};

export default InvoiceEditPage;
