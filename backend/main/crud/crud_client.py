# created on 22/07/2024 à 19:10:31

# Function to add in models.py


from main.models import Client
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
    CreateAPIView,
)
from main.serializers.client_serializers import (
    ClientSerializer,
    CreateClientSerializer,
    UpdateClientSerializer,
    RetrieveClientSerializer,
)


import logging


logger = logging.getLogger(__name__)


class ListClientAPIView(ListAPIView):
    # authentication_classes = [TokenAuthentication]

    model = Client
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class CreateClientAPIView(CreateAPIView):
    # authentication_classes = [TokenAuthentication]

    model = Client
    queryset = Client.objects.all()
    serializer_class = CreateClientSerializer


class UpdateClientAPIView(UpdateAPIView):
    # authentication_classes = [TokenAuthentication]

    model = Client
    queryset = Client.objects.all()
    serializer_class = UpdateClientSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "client_uid"


class RetrieveClientAPIView(RetrieveAPIView):
    # authentication_classes = [TokenAuthentication]

    model = Client
    queryset = Client.objects.all()
    serializer_class = RetrieveClientSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "client_uid"


class DeleteClientAPIView(DestroyAPIView):
    # authentication_classes = [TokenAuthentication]

    model = Client
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "client_uid"
