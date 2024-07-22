
# created on 22/07/2024 à 19:10:31

# Function to add in models.py




from main.models import Invoice
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from main.serializers.invoice_serializers import InvoiceSerializer, CreateInvoiceSerializer, UpdateInvoiceSerializer, RetrieveInvoiceSerializer


import logging


logger = logging.getLogger(__name__)


class ListInvoiceAPIView(ListAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = Invoice
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

                    
class CreateInvoiceAPIView(CreateAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = Invoice
    queryset = Invoice.objects.all()
    serializer_class = CreateInvoiceSerializer

                    
class UpdateInvoiceAPIView(UpdateAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = Invoice
    queryset = Invoice.objects.all()
    serializer_class = CreateInvoiceSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "invoice_uid"


                    
class RetrieveInvoiceAPIView(RetrieveAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = Invoice
    queryset = Invoice.objects.all()
    serializer_class = RetrieveInvoiceSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "invoice_uid"



                    
class DeleteInvoiceAPIView(DestroyAPIView):
    # authentication_classes = [TokenAuthentication] 

    model = Invoice
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "invoice_uid"


                    