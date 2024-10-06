from django.test import TestCase
from main.models import Client


class ClientModelTest(TestCase):

    def setUp(self):
        self.client_data = {
            "name": "ACME Corp",
            "address": "456 Client St",
            "postal_code": "75002",
            "city": "Lyon",
            "siren": "987654321",
            "bic": "KLMNOPQRSTU",
            "iban": "FR7612345987650987654321098",
            "email": "contact@acme.com",
        }

    def test_create_client(self):
        client = Client.objects.create(**self.client_data)
        self.assertEqual(Client.objects.count(), 1)
        self.assertEqual(client.name, self.client_data["name"])
        self.assertEqual(client.city, self.client_data["city"])
