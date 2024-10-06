
# created on 21/07/2024 à 17:22:32

# Function to add in models.py

from rest_framework import serializers
from main.models import User
import logging
logger = logging.getLogger(__name__)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

                    
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

                    
class RetrieveUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

                    
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

                    