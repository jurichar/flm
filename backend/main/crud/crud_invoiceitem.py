
# created on 22/07/2024 à 19:10:31

# Function to add in models.py




from main.models import InvoiceItem
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from main.serializers.invoiceitem_serializers import InvoiceItemSerializer, CreateInvoiceItemSerializer, UpdateInvoiceItemSerializer, RetrieveInvoiceItemSerializer


import logging


logger = logging.getLogger(__name__)


class ListInvoiceItemAPIView(ListAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = InvoiceItem
    queryset = InvoiceItem.objects.all()
    serializer_class = InvoiceItemSerializer

                    
class CreateInvoiceItemAPIView(CreateAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = InvoiceItem
    queryset = InvoiceItem.objects.all()
    serializer_class = CreateInvoiceItemSerializer

                    
class UpdateInvoiceItemAPIView(UpdateAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = InvoiceItem
    queryset = InvoiceItem.objects.all()
    serializer_class = CreateInvoiceItemSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "invoiceitem_uid"


                    
class RetrieveInvoiceItemAPIView(RetrieveAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = InvoiceItem
    queryset = InvoiceItem.objects.all()
    serializer_class = RetrieveInvoiceItemSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "invoiceitem_uid"



                    
class DeleteInvoiceItemAPIView(DestroyAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = InvoiceItem
    queryset = InvoiceItem.objects.all()
    serializer_class = InvoiceItemSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "invoiceitem_uid"


                    