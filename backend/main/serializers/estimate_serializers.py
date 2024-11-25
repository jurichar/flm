
# created on 22/07/2024 à 19:10:31

# Function to add in models.py

from rest_framework import serializers
from main.models import Estimate
import logging
logger = logging.getLogger(__name__)


class EstimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estimate
        fields = '__all__'

                    
class CreateEstimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estimate
        fields = '__all__'

                    
class RetrieveEstimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estimate
        fields = '__all__'

                    
class UpdateEstimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estimate
        fields = '__all__'

                    