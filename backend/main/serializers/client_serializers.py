# created on 22/07/2024 à 19:10:31

# Function to add in models.py

from rest_framework import serializers
from main.models import Client
import logging

logger = logging.getLogger(__name__)


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class CreateClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class RetrieveClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class UpdateClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
