// src/app/modules/invoice/page.jsx

'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from '@material-tailwind/react';
import apiClient from '../../../utils/apiClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await apiClient.get('/api/invoice/list/');
        setInvoices(response);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  const handleView = (invoiceId) => {
    router.push(`/modules/invoice/edit/${invoiceId}/`);
  };

  const handleDelete = async (invoiceId) => {
    try {
      await apiClient.delete(`/api/invoice/delete/${invoiceId}`);
      setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
      alert('Invoice deleted successfully.');
    } catch (error) {
      console.error('Failed to delete invoice:', error);
      alert('Failed to delete invoice.');
    }
  };

  return (
    <div>
      <Card>
        <table className="min-w-full divide-y divide-gray-200">
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
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
                <td className=" py-4 whitespace-nowrap text-right text-sm font-medium flex gap-4">
                  <Button
                    color="lightBlue"
                    onClick={() => handleView(invoice.id)}
                    ripple="light"
                  >
                    View
                  </Button>
                  <Button
                    color="red"
                    onClick={() => handleDelete(invoice.id)}
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
