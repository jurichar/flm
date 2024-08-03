// src/app/modules/invoice/edit/[invoice_id]/page.jsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@material-tailwind/react';
import { useRouter, usePathname } from 'next/navigation';
import PDFDocument from './PDFDocument';
import apiClient from '../../../../../utils/apiClient';
import { useSession } from 'next-auth/react';

const InvoiceEditPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const invoice_uid = pathname.split('/').pop();
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  const fetchInvoiceDetails = useCallback(async () => {
    try {
      const response = await apiClient.get(
        `/api/invoice/retrieve/${invoice_uid}`,
        session?.accessToken,
      );
      console.log('Response in invoice uid:', response);
      setInvoiceDetails(response);
    } catch (error) {
      console.error('Error fetching invoice details:', error);
    }
  }, [invoice_uid, session?.accessToken]);

  useEffect(() => {
    if (invoice_uid) {
      fetchInvoiceDetails();
    }
  }, [fetchInvoiceDetails, invoice_uid]);

  if (!invoiceDetails) return <p>Loading...</p>;

  const handleCopyInvoice = async () => {
    try {
      const newInvoiceDetails = {
        ...invoiceDetails,
        invoice_number: `${invoiceDetails.invoice_number}-copy`,
      };
      delete newInvoiceDetails.uid;

      const response = await apiClient.post(
        '/api/invoice/create/',
        newInvoiceDetails,
        session?.accessToken,
      );
      alert('Invoice copied successfully');
      console.log('Copied invoice:', response);
    } catch (error) {
      console.error('Error copying invoice:', error);
      alert('Failed to copy invoice');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8">
      <div className="flex flex-col gap-4">
        <Button color="blue" onClick={() => router.push('/modules/invoice/')}>
          Back
        </Button>
        <PDFDownloadLink
          document={<PDFDocument formValues={invoiceDetails} />}
          fileName="invoice.pdf"
        >
          <Button color="green">Download Invoice</Button>
        </PDFDownloadLink>
        <Button color="orange" onClick={handleCopyInvoice}>
          Copy Invoice
        </Button>
      </div>
      <PDFViewer className="sticky top-4 w-full" height="700" width="full">
        <PDFDocument formValues={invoiceDetails} />
      </PDFViewer>
    </div>
  );
};

export default InvoiceEditPage;
