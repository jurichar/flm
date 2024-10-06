# created on 22/07/2024 à 19:10:31

# Function to add in models.py


from main.models import Invoice
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
    CreateAPIView,
)
from main.serializers.invoice_serializers import (
    InvoiceSerializer,
    CreateInvoiceSerializer,
    UpdateInvoiceSerializer,
    RetrieveInvoiceSerializer,
)
from rest_framework.response import Response
from django.template.loader import render_to_string
from django.http import HttpResponse
from xhtml2pdf import pisa

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
    serializer_class = UpdateInvoiceSerializer
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


from xhtml2pdf import pisa
from django.template.loader import render_to_string
from django.http import HttpResponse


class GenerateInvoicePDFView(CreateAPIView):

    def get(self, request, invoice_uid):
        try:
            invoice = Invoice.objects.get(uid=invoice_uid)
        except Invoice.DoesNotExist:
            return Response({"error": "Invoice not found"}, status=404)

        serializer = InvoiceSerializer(invoice)
        html_content = render_to_string(
            "invoice_template.html", {"invoice": serializer.data}
        )

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = (
            f'attachment; filename="invoice_{invoice.invoice_number}.pdf"'
        )
        pisa_status = pisa.CreatePDF(html_content, dest=response)

        if pisa_status.err:
            return HttpResponse(f"Error generating PDF: {pisa_status.err}", status=500)

        return response
