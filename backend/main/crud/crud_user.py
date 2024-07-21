
# created on 21/07/2024 à 17:22:32

# Function to add in models.py




from main.models import User
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from main.serializers.user_serializers import UserSerializer, CreateUserSerializer, UpdateUserSerializer, RetrieveUserSerializer


import logging


logger = logging.getLogger(__name__)


class ListUserAPIView(ListAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer

                    
class CreateUserAPIView(CreateAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = User
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer

                    
class UpdateUserAPIView(UpdateAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = User
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "user_uid"


                    
class RetrieveUserAPIView(RetrieveAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = User
    queryset = User.objects.all()
    serializer_class = RetrieveUserSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "user_uid"



                    
class DeleteUserAPIView(DestroyAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "user_uid"


                    