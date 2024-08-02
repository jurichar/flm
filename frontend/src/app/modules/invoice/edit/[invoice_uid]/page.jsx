// src/app/modules/invoice/edit/[invoice_id]/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import apiClient from '../../../../../utils/apiClient';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { useSession } from 'next-auth/react';

const InvoiceEditPage = () => {
  const { data: session } = useSession();
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

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8">
      <PDFViewer className="sticky top-4 w-full" height="700" width="full">
        <PDFDocument formValues={invoiceDetails} />
      </PDFViewer>
    </div>
  );
};

export default InvoiceEditPage;
