
# created on 22/07/2024 à 19:10:31

# Function to add in models.py

from rest_framework import serializers
from main.models import Invoice
import logging
logger = logging.getLogger(__name__)


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

                    
class CreateInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

                    
class RetrieveInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

                    
class UpdateInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

                    