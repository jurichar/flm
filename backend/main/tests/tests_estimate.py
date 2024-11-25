from django.test import TestCase
from main.models import Client, Estimate


class EstimateModelTest(TestCase):

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
        self.estimate_data = {
            "client": self.client,
            "estimate_number": "INV-2024-001",
            "tva": 20.00,
            "total_ht": 1000.00,
            "total_tva": 200.00,
            "total_ttc": 1200.00,
            "items": [{"description": "Service A", "quantity": 1, "price": 1000.00}],
            "accepted": False,
        }

    def test_create_estimate(self):
        estimate = Estimate.objects.create(**self.estimate_data)
        self.assertEqual(Estimate.objects.count(), 1)
        self.assertEqual(estimate.estimate_number, self.estimate_data["estimate_number"])
        self.assertEqual(estimate.client.name, self.client.name)
        self.assertFalse(estimate.accepted)


from django.test import TestCase
from main.models import Client, Estimate


class EstimateClientRelationTest(TestCase):

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
        self.estimate_data = {
            "client": self.client,
            "estimate_number": "INV-2024-001",
            "tva": 20.00,
            "total_ht": 1000.00,
            "total_tva": 200.00,
            "total_ttc": 1200.00,
            "items": [{"description": "Service A", "quantity": 1, "price": 1000.00}],
            "accepted": False,
        }

    def test_estimate_client_relation(self):
        estimate = Estimate.objects.create(**self.estimate_data)
        self.assertEqual(estimate.client, self.client)
        self.assertIn(estimate, self.client.estimates.all())
