from django.test import TestCase
from main.models import Client, Invoice


class InvoiceModelTest(TestCase):

    def setUp(self):
        self.client = Client.objects.create(
            name="ACME Corp",
            address="456 Client St",
            postal_code="75002",
            city="Lyon",
            siren="987654321",
            bic="KLMNOPQRSTU",
            iban="FR7612345987650987654321098",
            email="contact@acme.com",
        )
        self.invoice_data = {
            "client": self.client,
            "invoice_number": "INV-2024-001",
            "tva": 20.00,
            "total_ht": 1000.00,
            "total_tva": 200.00,
            "total_ttc": 1200.00,
            "items": [{"description": "Service A", "quantity": 1, "price": 1000.00}],
            "paid": False,
        }

    def test_create_invoice(self):
        invoice = Invoice.objects.create(**self.invoice_data)
        self.assertEqual(Invoice.objects.count(), 1)
        self.assertEqual(invoice.invoice_number, self.invoice_data["invoice_number"])
        self.assertEqual(invoice.client.name, self.client.name)
        self.assertFalse(invoice.paid)


from django.test import TestCase
from main.models import Client, Invoice


class InvoiceClientRelationTest(TestCase):

    def setUp(self):
        self.client = Client.objects.create(
            name="ACME Corp",
            address="456 Client St",
            postal_code="75002",
            city="Lyon",
            siren="987654321",
            bic="KLMNOPQRSTU",
            iban="FR7612345987650987654321098",
            email="contact@acme.com",
        )
        self.invoice_data = {
            "client": self.client,
            "invoice_number": "INV-2024-001",
            "tva": 20.00,
            "total_ht": 1000.00,
            "total_tva": 200.00,
            "total_ttc": 1200.00,
            "items": [{"description": "Service A", "quantity": 1, "price": 1000.00}],
            "paid": False,
        }

    def test_invoice_client_relation(self):
        invoice = Invoice.objects.create(**self.invoice_data)
        self.assertEqual(invoice.client, self.client)
        self.assertIn(invoice, self.client.invoices.all())
