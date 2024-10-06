from django.test import TestCase
from main.models import User


class UserModelTest(TestCase):

    def setUp(self):
        self.user_data = {
            "login": "freelance123",
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.com",
            "address": "123 Main St",
            "postal_code": "75001",
            "city": "Paris",
            "siren": "123456789",
            "bic": "ABCDEFGHIJK",
            "iban": "FR7612345987650123456789014",
        }

    def test_create_user(self):
        user = User.objects.create_user(**self.user_data, password="securepassword")
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(user.login, self.user_data["login"])
        self.assertTrue(user.check_password("securepassword"))


from django.test import TestCase
from main.models import User, Client, Invoice


class UserInvoiceTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            login="freelance123",
            password="securepassword",
            first_name="John",
            last_name="Doe",
            email="johndoe@example.com",
        )
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

    def test_user_can_create_invoice(self):
        invoice = Invoice.objects.create(**self.invoice_data)
        self.assertEqual(invoice.client, self.client)
