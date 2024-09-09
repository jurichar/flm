// src/app/modules/invoiceGenerator/page.jsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@material-tailwind/react';
import apiClient from '../../../../utils/apiClient';
import LoadingScreen from '../../../../components/Shared/LoadingScreen';

const Module = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await apiClient.get(
        `/api/user/retrieve/${session.user.uid}`,
        session.accessToken,
      );
      const userData = response;
      console.log('User data:', userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session, fetchUserData]);

  const handleDownloadPDF = async (invoiceId) => {
    try {
      const response = await apiClient.get(
        `/api/invoice/pdf/${invoiceId}`,
        session.accessToken,
        {
          responseType: 'blob',
        },
      );
      const blob = await response;
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Failed to download PDF', error);
    }
  };

  const handleSaveInvoice = async () => {
    try {
      const invoiceId = '8d02fbe2-e199-4a6d-a16f-1e38c2f46e28';
      handleDownloadPDF(invoiceId);
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert('Failed to save invoice');
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8">
      <div className="min-w-2/5 p-1">
        <Button className="w-full mt-2" onClick={handleSaveInvoice}>
          Save Invoice & Download PDF
        </Button>
      </div>
    </div>
  );
};

export default Module;
