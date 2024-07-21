# created on 21/07/2024 à 17:22:32

# Function to add in models.py


from main.models import User
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
    CreateAPIView,
)
from main.serializers.user_serializers import (
    UserSerializer,
    CreateUserSerializer,
    UpdateUserSerializer,
    RetrieveUserSerializer,
)
from rest_framework.permissions import IsAuthenticated


import logging


logger = logging.getLogger(__name__)


class ListUserAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]

    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CreateUserAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    model = User
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer


class UpdateUserAPIView(UpdateAPIView):
    permission_classes = [IsAuthenticated]

    model = User
    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "user_uid"


class RetrieveUserAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    model = User
    queryset = User.objects.all()
    serializer_class = RetrieveUserSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "user_uid"


class DeleteUserAPIView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "user_uid"
