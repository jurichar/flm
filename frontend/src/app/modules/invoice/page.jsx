// src/app/modules/invoice/page.jsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, Button, Checkbox } from '@material-tailwind/react';
import apiClient from '../../../utils/apiClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const InvoicesPage = () => {
  const { data: session, status } = useSession();
  const [invoices, setInvoices] = useState([]);
  const router = useRouter();

  const fetchInvoices = useCallback(async () => {
    try {
      const response = await apiClient.get(
        '/api/invoice/list/',
        session?.accessToken,
      );
      setInvoices(response);
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    }
  }, [session?.accessToken, setInvoices]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchInvoices();
    }
  }, [session, fetchInvoices, status]);

  const handleView = (invoiceId) => {
    router.push(`/modules/invoice/edit/${invoiceId}/`);
  };

  const handleDelete = async (invoiceId) => {
    try {
      await apiClient.delete(
        `/api/invoice/delete/${invoiceId}/`,
        session.accessToken,
      );
      setInvoices(invoices.filter((invoice) => invoice.uid !== invoiceId));
    } catch (error) {
      console.error('Failed to delete invoice:', error);
    }
  };

  const handlePaidChange = async (invoiceId, paid) => {
    try {
      const invoice = invoices.find((inv) => inv.uid === invoiceId);

      await apiClient.put(
        `/api/invoice/update/${invoiceId}/`,
        {
          invoice_number: invoice.invoice_number,
          client_name: invoice.client_name,
          client_address: invoice.client_address,
          client_postal_code: invoice.client_postal_code,
          client_city: invoice.client_city,
          tva: invoice.tva,
          total_ht: invoice.total_ht,
          total_tva: invoice.total_tva,
          total_ttc: invoice.total_ttc,
          user: invoice.user,
          paid: paid,
        },
        session.accessToken,
      );

      setInvoices(
        invoices.map((inv) => (inv.uid === invoiceId ? { ...inv, paid } : inv)),
      );
    } catch (error) {
      console.error('Failed to update invoice:', error);
    }
  };

  return (
    <div>
      <Card className="!rounded-xl p-4">
        <table className="w-full divide-y divide-gray-200 !rounded">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total HT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total TVA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total TTC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paid
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.uid}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.invoice_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.client_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.total_ht}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.total_tva}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.total_ttc}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Checkbox
                    checked={invoice.paid}
                    onChange={(e) =>
                      handlePaidChange(invoice.uid, e.target.checked)
                    }
                  />
                </td>
                <td className=" py-4 whitespace-nowrap text-right text-sm font-medium flex gap-4">
                  <Button
                    color="lightBlue"
                    onClick={() => handleView(invoice.uid)}
                    ripple="light"
                  >
                    View
                  </Button>
                  <Button
                    color="red"
                    onClick={() => handleDelete(invoice.uid)}
                    ripple="light"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Link href="/modules/invoice/new">
        <Button color="lightBlue" ripple="light">
          Create Invoice
        </Button>
      </Link>
    </div>
  );
};

export default InvoicesPage;
